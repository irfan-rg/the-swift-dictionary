import Foundation
import Combine
import SwiftUI

@MainActor
final class DictionaryViewModel: ObservableObject {
    @Published var words: [WordWithDetails] = []
    @Published var total: Int = 0
    @Published var isLoading: Bool = false
    @Published var isPaginating: Bool = false
    @Published var errorMessage: String? = nil
    
    // Filters
    @Published var searchText: String = ""
    @Published var selectedAlbum: EraSlug? = nil
    @Published var selectedDifficulty: Difficulty? = nil
    @Published var selectedSort: SupabaseService.DictionaryFilters.SortOption = .az
    
    // Pagination state
    private let limit = 30
    private var currentPage = 1
    var hasMore: Bool {
        words.count < total
    }
    
    // Debounce bag
    private var cancellables = Set<AnyCancellable>()
    private var fetchTask: Task<Void, Never>?
    
    init() {
        setupBindings()
        fetchInitial()
    }
    
    private func setupBindings() {
        // Debounce search text
        $searchText
            .dropFirst()
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .sink { [weak self] _ in
                self?.fetchInitial()
            }
            .store(in: &cancellables)
            
        // Trigger fetch immediately on filter changes
        Publishers.Merge3(
            $selectedAlbum.dropFirst().map { _ in () },
            $selectedDifficulty.dropFirst().map { _ in () },
            $selectedSort.dropFirst().map { _ in () }
        )
        .sink { [weak self] _ in
            self?.fetchInitial()
        }
        .store(in: &cancellables)
    }
    
    func fetchInitial() {
        // Cancel any previous inflight fetches
        fetchTask?.cancel()
        
        fetchTask = Task {
            do {
                self.isLoading = true
                self.errorMessage = nil
                self.currentPage = 1
                
                let filters = SupabaseService.DictionaryFilters(
                    query: searchText,
                    album: selectedAlbum,
                    difficulty: selectedDifficulty,
                    sort: selectedSort,
                    limit: limit,
                    offset: 0
                )
                
                let result = try await SupabaseService.shared.fetchDictionaryWords(filters: filters)
                
                if Task.isCancelled { return }
                
                self.words = result.words
                self.total = result.total
                self.isLoading = false
            } catch {
                if Task.isCancelled { return }
                self.errorMessage = error.localizedDescription
                self.isLoading = false
            }
        }
    }
    
    func fetchNextPage() {
        guard hasMore, !isPaginating, !isLoading else { return }
        
        Task {
            do {
                self.isPaginating = true
                self.currentPage += 1
                
                let filters = SupabaseService.DictionaryFilters(
                    query: searchText,
                    album: selectedAlbum,
                    difficulty: selectedDifficulty,
                    sort: selectedSort,
                    limit: limit,
                    offset: (currentPage - 1) * limit
                )
                
                let result = try await SupabaseService.shared.fetchDictionaryWords(filters: filters)
                
                if Task.isCancelled { return }
                
                self.words.append(contentsOf: result.words)
                self.isPaginating = false
            } catch {
                if Task.isCancelled { return }
                self.isPaginating = false
                // Silent fail for pagination, user can trigger again by scrolling
            }
        }
    }
}
