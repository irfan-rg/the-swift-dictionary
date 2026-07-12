import SwiftUI

struct DictionaryFiltersSheet: View {
    @ObservedObject var viewModel: DictionaryViewModel
    @Environment(\.colorScheme) var colorScheme
    @Environment(\.dismiss) var dismiss
    
    // Custom styling to make the form match our Victorian aesthetic better
    init(viewModel: DictionaryViewModel) {
        self.viewModel = viewModel
    }
    
    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Picker("Era", selection: $viewModel.selectedAlbum) {
                        Text("All Eras").tag(EraSlug?.none)
                        ForEach(allEras) { era in
                            Text(era.label).tag(Optional(era.slug))
                        }
                    }
                } header: {
                    Text("Filter by Era").font(.system(size: 11, weight: .medium)).tracking(1).textCase(.uppercase)
                }
                
                Section {
                    Picker("Difficulty", selection: $viewModel.selectedDifficulty) {
                        Text("All Difficulties").tag(Difficulty?.none)
                        Text("Beginner").tag(Optional(Difficulty.beginner))
                        Text("Intermediate").tag(Optional(Difficulty.intermediate))
                        Text("Advanced").tag(Optional(Difficulty.advanced))
                        Text("Scholar").tag(Optional(Difficulty.scholar))
                    }
                } header: {
                    Text("Filter by Difficulty").font(.system(size: 11, weight: .medium)).tracking(1).textCase(.uppercase)
                }
                
                Section {
                    Picker("Sort by", selection: $viewModel.selectedSort) {
                        Text("A-Z").tag(SupabaseService.DictionaryFilters.SortOption.az)
                        Text("Z-A").tag(SupabaseService.DictionaryFilters.SortOption.za)
                        Text("Difficulty").tag(SupabaseService.DictionaryFilters.SortOption.difficulty)
                        Text("Relevance").tag(SupabaseService.DictionaryFilters.SortOption.relevance)
                    }
                } header: {
                    Text("Sorting").font(.system(size: 11, weight: .medium)).tracking(1).textCase(.uppercase)
                }
            }
            .scrollContentBackground(.hidden)
            .background(AppColors.background(for: colorScheme))
            .navigationTitle("Filters")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(AppColors.accent(for: colorScheme))
                }
                
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Clear All") {
                        viewModel.selectedAlbum = nil
                        viewModel.selectedDifficulty = nil
                        viewModel.selectedSort = .az
                    }
                    .font(.system(size: 14))
                    .foregroundColor(AppColors.foregroundMuted(for: colorScheme))
                }
            }
        }
        .presentationDetents([.medium, .large])
    }
}
