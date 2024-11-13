<template>
  <div class="saved-recipes">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Saved Recipes</h1>
      
      <!-- Collection Actions -->
      <div class="flex items-center space-x-4">
        <button
          @click="isCreateCollectionModalOpen = true"
          class="flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <font-awesome-icon icon="plus" class="mr-2" />
          New Collection
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          class="py-4 px-1 whitespace-nowrap"
          :class="[
            currentTab === tab.id
              ? 'border-b-2 border-indigo-500 text-indigo-600 font-medium'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          <font-awesome-icon :icon="tab.icon" class="mr-2" />
          {{ tab.name }}
          <span
            class="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100"
          >
            {{ getTabCount(tab.id) }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Content -->
    <div class="min-h-[400px]">
      <!-- Collections View (Favorites) -->
      <div v-if="currentTab === 'favorites'" class="space-y-6">
        <!-- Collections Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="collection in collections"
            :key="collection.id"
            class="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img
                :src="collection.coverImage || defaultCoverImage"
                :alt="collection.name"
                class="object-cover w-full h-full"
              >
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ collection.name }}
              </h3>
              <p class="text-sm text-gray-500 mb-3">
                {{ collection.recipeCount }} recipes
              </p>
              <div class="flex justify-between items-center">
                <button
                  @click="viewCollection(collection.id)"
                  class="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  View Collection
                </button>
                <button
                  @click="deleteCollection(collection.id)"
                  class="text-gray-400 hover:text-gray-500"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="collections.length === 0"
          class="text-center py-12 bg-gray-50 rounded-lg"
        >
          <font-awesome-icon icon="heart" class="text-4xl text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-1">No Saved Collections</h3>
          <p class="text-gray-500 mb-4">Start saving your favorite recipes in collections</p>
          <button
            @click="isCreateCollectionModalOpen = true"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Your First Collection
          </button>
        </div>
      </div>

      <!-- Recently Viewed -->
      <div v-else-if="currentTab === 'recent'" class="space-y-6">
        <div v-if="recentRecipes.length">
          <recipe-grid
            :recipes="recentRecipes"
            @view-recipe="navigateToRecipe"
            @toggle-favorite="toggleFavorite"
          />
        </div>
        <div
          v-else
          class="text-center py-12 bg-gray-50 rounded-lg"
        >
          <font-awesome-icon icon="clock" class="text-4xl text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-1">No Recent Recipes</h3>
          <p class="text-gray-500">Browse recipes to see your history here</p>
        </div>
      </div>

      <!-- Created Recipes -->
      <div v-else-if="currentTab === 'created'" class="space-y-6">
        <div class="flex justify-end mb-4">
          <button
            @click="navigateToCreateRecipe"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <font-awesome-icon icon="plus" class="mr-2" />
            Create New Recipe
          </button>
        </div>

        <div v-if="createdRecipes.length">
          <recipe-grid
            :recipes="createdRecipes"
            @view-recipe="navigateToRecipe"
            @toggle-favorite="toggleFavorite"
          />
        </div>
        <div
          v-else
          class="text-center py-12 bg-gray-50 rounded-lg"
        >
          <font-awesome-icon icon="book" class="text-4xl text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-1">No Created Recipes</h3>
          <p class="text-gray-500 mb-4">Start creating your own recipes</p>
          <button
            @click="navigateToCreateRecipe"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Your First Recipe
          </button>
        </div>
      </div>
    </div>

    <!-- Create Collection Modal -->
    <app-modal
      v-model="isCreateCollectionModalOpen"
      title="Create New Collection"
    >
      <form @submit.prevent="createCollection" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="newCollection.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="newCollection.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          ></textarea>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="isCreateCollectionModalOpen = false"
            class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            @click="createCollection"
            class="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Create
          </button>
        </div>
      </template>
    </app-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import RecipeGrid from '@/components/recipe/RecipeGrid.vue'
import AppModal from '@/components/common/AppModal.vue'

const router = useRouter()
const currentTab = ref('favorites')
const isCreateCollectionModalOpen = ref(false)

const tabs = [
  { id: 'favorites', name: 'Collections', icon: 'heart' },
  { id: 'recent', name: 'Recently Viewed', icon: 'clock' },
  { id: 'created', name: 'Created Recipes', icon: 'book' },
]

// Mock data - Replace with actual API calls
const collections = ref([
  {
    id: 1,
    name: 'Weeknight Dinners',
    recipeCount: 12,
    coverImage: null,
  },
  // Add more collections...
])

const recentRecipes = ref([
  // Add recent recipes...
])

const createdRecipes = ref([
  // Add created recipes...
])

const newCollection = ref({
  name: '',
  description: '',
})

const defaultCoverImage = '/default-collection-cover.jpg'

// Computed
const getTabCount = (tabId) => {
  switch (tabId) {
    case 'favorites':
      return collections.value.length
    case 'recent':
      return recentRecipes.value.length
    case 'created':
      return createdRecipes.value.length
    default:
      return 0
  }
}

// Methods
const createCollection = async () => {
  try {
    // Implement collection creation logic
    collections.value.push({
      id: Date.now(),
      name: newCollection.value.name,
      description: newCollection.value.description,
      recipeCount: 0,
      coverImage: null,
    })
    isCreateCollectionModalOpen.value = false
    newCollection.value = { name: '', description: '' }
  } catch (error) {
    console.error('Error creating collection:', error)
  }
}

const viewCollection = (collectionId) => {
  router.push(`/recipes/collections/${collectionId}`)
}

const deleteCollection = async (collectionId) => {
  if (confirm('Are you sure you want to delete this collection?')) {
    try {
      // Implement delete logic
      collections.value = collections.value.filter(c => c.id !== collectionId)
    } catch (error) {
      console.error('Error deleting collection:', error)
    }
  }
}

const navigateToRecipe = (recipeId) => {
  router.push({ name: 'RecipeDetails', params: { id: recipeId } })
}

const navigateToCreateRecipe = () => {
  router.push({ name: 'CreateRecipe' })
}

const toggleFavorite = async (recipeId) => {
  // Implement favorite toggle logic
}
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>