import SwiftUI

struct DictionaryView: View {
    @StateObject private var viewModel = DictionaryViewModel()
    @Environment(\.colorScheme) var colorScheme
    
    @State private var showingFilters = false
    @State private var selectedWord: WordWithDetails? = nil
    
    // Grid columns configuration (adaptive for iPad/iPhone)
    private let columns = [
        GridItem(.adaptive(minimum: 320, maximum: 400), spacing: 16)
    ]
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                VStack(spacing: 8) {
                    Text("The Full Index")
                        .font(.system(size: 10, weight: .bold))
                        .tracking(2)
                        .textCase(.uppercase)
                        .foregroundColor(AppColors.accent(for: colorScheme))
                    
                    Text("Dictionary")
                        .font(AppFont.branding(size: 48))
                        .foregroundColor(AppColors.foreground(for: colorScheme))
                    
                    Text("Search and filter vocabulary words discovered across every era.")
                        .font(AppFont.body(size: 14))
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                        .multilineTextAlignment(.center)
                        .padding(.horizontal, 32)
                    
                    Rectangle()
                        .fill(AppColors.borderFocus(for: colorScheme))
                        .frame(width: 64, height: 1)
                        .opacity(0.5)
                        .padding(.top, 16)
                }
                .padding(.top, 40)
                
                // Search & Filter Bar
                HStack(spacing: 12) {
                    // Search Field
                    HStack(spacing: 8) {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.7))
                        
                        TextField("Search words, songs...", text: $viewModel.searchText)
                            .font(AppFont.body(size: 15))
                            .foregroundColor(AppColors.foreground(for: colorScheme))
                            .autocorrectionDisabled()
                            .submitLabel(.search)
                        
                        if !viewModel.searchText.isEmpty {
                            Button(action: { viewModel.searchText = "" }) {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                            }
                        }
                    }
                    .padding(.horizontal, 12)
                    .padding(.vertical, 12)
                    .background(AppColors.surfaceRaised(for: colorScheme))
                    .cornerRadius(AppCorners.md)
                    .overlay(
                        RoundedRectangle(cornerRadius: AppCorners.md)
                            .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                    )
                    
                    // Filters Button
                    Button(action: { showingFilters = true }) {
                        Image(systemName: "slider.horizontal.3")
                            .font(.system(size: 18))
                            .foregroundColor(activeFiltersCount > 0 ? AppColors.accent(for: colorScheme) : AppColors.foregroundMuted(for: colorScheme))
                            .padding(.horizontal, 12)
                            .frame(height: 44) // Match typical search bar height
                            .background(AppColors.surfaceRaised(for: colorScheme))
                            .cornerRadius(AppCorners.md)
                            .overlay(
                                RoundedRectangle(cornerRadius: AppCorners.md)
                                    .stroke(AppColors.border(for: colorScheme), lineWidth: 1)
                            )
                            .overlay(
                                // Notification dot if filters are active
                                Group {
                                    if activeFiltersCount > 0 {
                                        Circle()
                                            .fill(AppColors.accent(for: colorScheme))
                                            .frame(width: 8, height: 8)
                                            .offset(x: -4, y: 4)
                                    }
                                }
                                , alignment: .topTrailing
                            )
                    }
                }
                .padding(.horizontal, 16)
                
                // Results count
                HStack {
                    Text("\(viewModel.total) \(viewModel.total == 1 ? "word" : "words") found")
                        .font(AppFont.body(size: 12))
                        .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.7))
                    Spacer()
                }
                .padding(.horizontal, 20)
                
                // Grid of Words
                if viewModel.isLoading && viewModel.words.isEmpty {
                    ProgressView()
                        .padding(.top, 40)
                        .tint(AppColors.accent(for: colorScheme))
                } else if viewModel.words.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "magnifyingglass")
                            .font(.system(size: 32))
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme).opacity(0.5))
                        Text("No results found.")
                            .font(AppFont.body(size: 15))
                            .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                    }
                    .padding(.top, 60)
                } else {
                    LazyVGrid(columns: columns, spacing: 16) {
                        ForEach(viewModel.words, id: \.id) { word in
                            WordCardView(word: word)
                                .onTapGesture {
                                    selectedWord = word
                                }
                                .onAppear {
                                    // Pagination trigger
                                    if word.id == viewModel.words.last?.id {
                                        viewModel.fetchNextPage()
                                    }
                                }
                        }
                    }
                    .padding(.horizontal, 16)
                    
                    if viewModel.isPaginating {
                        ProgressView()
                            .padding(.vertical, 24)
                            .tint(AppColors.accent(for: colorScheme))
                    }
                }
            }
            .padding(.bottom, 60)
        }
        .background(AppColors.background(for: colorScheme).ignoresSafeArea())
        .sheet(isPresented: $showingFilters) {
            DictionaryFiltersSheet(viewModel: viewModel)
        }
        .sheet(item: $selectedWord) { word in
            WordDetailSheet(word: word)
        }
    }
    
    private var activeFiltersCount: Int {
        var count = 0
        if viewModel.selectedAlbum != nil { count += 1 }
        if viewModel.selectedDifficulty != nil { count += 1 }
        if viewModel.selectedSort != .az { count += 1 }
        return count
    }
}
