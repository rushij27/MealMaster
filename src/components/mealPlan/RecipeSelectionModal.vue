// src/views/MealPlanner/components/RecipeSelectionModal.vue
<template>
  <app-modal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Add Recipe to Meal Plan"
    size="lg"
  >
    <div class="space-y-6">
      <!-- Search Section -->
      <div class="flex space-x-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search recipes..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            @keyup.enter="handleSearch"
          >
        </div>
        <button
          @click="handleSearch"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <font-awesome-icon icon="search" class="mr-2" />
          Search
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cuisine
          </label>
          <select
            v-model="filters.cuisine"
            class="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any Cuisine</option>
            <option v-for="cuisine in cuisineOptions" :key="cuisine" :value="cuisine">
              {{ cuisine }}
            </option>
          </select>
        </div>

        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Diet
          </label>
          <select
            v-model="filters.diet"
            class="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Any Diet</option>
            <option v-for="diet in dietOptions" :key="diet.value" :value="diet.value">
              {{ diet.label }}
            </option>
          </select>
        </div>

        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Max Time (minutes)
          </label>
          <input
            v-model.number="filters.maxReadyTime"
            type="number"
            min="0"
            step="5"
            class="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          >
        </div>
      </div>

      <!-- Results -->
      <div class="space-y-4">
        <div v-if="loading" class="flex justify-center py-8">
          <app-loader />
        </div>

        <div v-else-if="searchResults.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="recipe in searchResults"
            :key="recipe.id"
            class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            @click="selectRecipe(recipe)"
          >
            <div class="flex space-x-4">
              <img
                :src="recipe.image"
                :alt="recipe.title"
                class="w-20 h-20 object-cover rounded-md"
              >
              <div>
                <h3 class="font-medium text-gray-900">{{ recipe.title }}</h3>
                <div class="mt-1 text-sm text-gray-500">
                  <div class="flex items-center">
                    <font-awesome-icon icon="clock" class="mr-1" />
                    {{ recipe.readyInMinutes }} minutes
                  </div>
                  <div class="flex items-center">
                    <font-awesome-icon icon="utensils" class="mr-1" />
                    {{ recipe.servings }} servings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="searched" class="text-center py-8">
          <p class="text-gray-500">No recipes found matching your criteria</p>
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <template #footer>
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('update:modelValue', false)"
          class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Cancel
        </button>
      </div>
    </template>
  </app-modal>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppModal from '@/components/common/AppModal.vue'
import AppLoader from '@/components/common/AppLoader.vue'
import { useRecipeStore } from '@/store/recipe';

const props = defineProps({
  modelValue: Boolean,
  selectedDate: {
    type: Date,
    required: true
  },
  selectedMealType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'select-recipe'])

// State
const searchQuery = ref('')
const loading = ref(false)
const searched = ref(false)
const searchResults = ref([])
const filters = ref({
  cuisine: '',
  diet: '',
  maxReadyTime: 60
})

// Constants
const cuisineOptions = [
  'Italian',
  'Mexican',
  'Asian',
  'American',
  'Mediterranean',
  'Indian',
  'French'
]

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'ketogenic', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' }
]

// Store
const recipeStore = useRecipeStore()

// Methods
const handleSearch = async () => {
  loading.value = true
  try {
    const results = await recipeStore.searchRecipes({
      query: searchQuery.value,
      ...filters.value
    })
    searchResults.value = results
    searched.value = true
  } catch (error) {
    console.error('Error searching recipes:', error)
  } finally {
    loading.value = false
  }
}

const selectRecipe = (recipe) => {
  emit('select-recipe', {
    ...recipe,
    date: props.selectedDate,
    mealType: props.selectedMealType
  })
}

// Reset search when modal opens
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    searchQuery.value = ''
    searchResults.value = []
    searched.value = false
  }
})
</script>