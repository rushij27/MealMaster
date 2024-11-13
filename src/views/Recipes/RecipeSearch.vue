<template>
    <div class="recipe-search">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Find Recipes</h1>
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search Bar -->
          <div class="flex-grow">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search recipes..."
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                @keyup.enter="handleSearch"
              >
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <font-awesome-icon icon="search" />
              </span>
            </div>
          </div>
          <!-- View Toggle -->
          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = 'grid'"
              class="p-2 rounded-lg"
              :class="viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'"
            >
              <font-awesome-icon icon="grid" />
            </button>
            <button
              @click="viewMode = 'list'"
              class="p-2 rounded-lg"
              :class="viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'"
            >
              <font-awesome-icon icon="list" />
            </button>
          </div>
        </div>
      </div>
  
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-72 flex-shrink-0">
          <recipe-filters
            :initial-filters="filters"
            @filter-change="handleFilterChange"
          />
        </div>
  
        <!-- Results Section -->
        <div class="flex-grow">
          <!-- Active Filters -->
          <div v-if="hasActiveFilters" class="mb-4 flex flex-wrap gap-2">
            <span
              v-for="filter in activeFilters"
              :key="filter.key"
              class="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm"
            >
              {{ filter.label }}
              <button
                @click="removeFilter(filter.key)"
                class="ml-2 text-indigo-500 hover:text-indigo-700"
              >
                ×
              </button>
            </span>
          </div>
  
          <!-- Results Grid/List -->
          <recipe-grid
            v-if="viewMode === 'grid'"
            :recipes="recipes"
            :loading="loading"
            :title="`${totalRecipes} Recipes Found`"
            @view-recipe="navigateToRecipe"
            @toggle-favorite="toggleFavorite"
          />
          
          <div v-else class="space-y-4">
            <div
              v-for="recipe in recipes"
              :key="recipe.id"
              class="bg-white rounded-lg shadow-sm p-4 flex gap-4"
            >
              <img
                :src="recipe.image"
                :alt="recipe.title"
                class="w-24 h-24 object-cover rounded-lg"
              >
              <div class="flex-grow">
                <h3 class="text-lg font-semibold mb-2">{{ recipe.title }}</h3>
                <p class="text-gray-600 text-sm mb-2 line-clamp-2">
                  {{ recipe.summary }}
                </p>
                <div class="flex items-center gap-4">
                  <span class="text-sm text-gray-500">
                    <font-awesome-icon icon="clock" class="mr-1" />
                    {{ recipe.readyInMinutes }} min
                  </span>
                  <button
                    @click="navigateToRecipe(recipe.id)"
                    class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <div class="flex space-x-2">
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                class="px-4 py-2 rounded-lg"
                :class="page === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                {{ page }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { recipeAPI } from '../../api/recipes'
  import RecipeFilters from '../../components/recipe/RecipeFilters.vue'
  import RecipeGrid from '../../components/recipe/RecipeGrid.vue'
  
  const router = useRouter()
  const loading = ref(false)
  const recipes = ref([])
  const totalRecipes = ref(0)
  const currentPage = ref(1)
  const viewMode = ref('grid')
  const searchQuery = ref('')
  const filters = ref({
    diet: [],
    cuisine: '',
    maxReadyTime: 60,
    ingredients: []
  })
  
  // Computed Properties
  const hasActiveFilters = computed(() => {
    return filters.value.diet.length > 0 ||
      filters.value.cuisine ||
      filters.value.maxReadyTime !== 60 ||
      filters.value.ingredients.length > 0
  })
  
  const activeFilters = computed(() => {
    const active = []
    if (filters.value.diet.length) {
      active.push({ key: 'diet', label: `Diet: ${filters.value.diet.join(', ')}` })
    }
    if (filters.value.cuisine) {
      active.push({ key: 'cuisine', label: `Cuisine: ${filters.value.cuisine}` })
    }
    if (filters.value.maxReadyTime !== 60) {
      active.push({ key: 'time', label: `Time: ${filters.value.maxReadyTime} min` })
    }
    return active
  })
  
  const totalPages = computed(() => Math.ceil(totalRecipes.value / 12))
  
  const displayedPages = computed(() => {
    const pages = []
    const maxPages = Math.min(totalPages.value, 5)
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxPages - 1)
    
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  })
  
  // Methods
  const fetchRecipes = async () => {
    loading.value = true
    try {
      const response = await recipeAPI.searchRecipes({
        query: searchQuery.value,
        offset: (currentPage.value - 1) * 12,
        number: 12,
        ...filters.value
      })
      recipes.value = response.data.results
      totalRecipes.value = response.data.totalResults
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      loading.value = false
    }
  }
  
  const handleSearch = () => {
    currentPage.value = 1
    fetchRecipes()
  }
  
  const handleFilterChange = (newFilters) => {
    filters.value = newFilters
    currentPage.value = 1
    fetchRecipes()
  }
  
  const removeFilter = (filterKey) => {
    if (filterKey === 'diet') {
      filters.value.diet = []
    } else if (filterKey === 'cuisine') {
      filters.value.cuisine = ''
    } else if (filterKey === 'time') {
      filters.value.maxReadyTime = 60
    }
    fetchRecipes()
  }
  
  const navigateToRecipe = (recipeId) => {
    router.push({ name: 'RecipeDetails', params: { id: recipeId } })
  }
  
  const toggleFavorite = async (recipeId) => {
    // Implement favorite toggle logic
  }
  
  // Watchers
  watch(currentPage, () => {
    fetchRecipes()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
  
  // Lifecycle
  onMounted(() => {
    const queryParams = router.currentRoute.value.query
    if (queryParams.q) {
      searchQuery.value = queryParams.q
    }
    fetchRecipes()
  })
  </script>