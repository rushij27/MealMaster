<template>
    <div class="bg-white rounded-lg shadow-sm p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
  
      <!-- Diet Restrictions -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Diet</h4>
        <div class="space-y-2">
          <label
            v-for="diet in dietOptions"
            :key="diet.value"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="diet.value"
              v-model="selectedDiets"
              class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            >
            <span class="ml-2 text-sm text-gray-600">{{ diet.label }}</span>
          </label>
        </div>
      </div>
  
      <!-- Cooking Time -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">
          Cooking Time ({{ cookingTime }} min)
        </h4>
        <input
          type="range"
          v-model="cookingTime"
          min="10"
          max="120"
          step="5"
          class="w-full"
        >
      </div>
  
      <!-- Ingredients -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Ingredients</h4>
        <div class="space-y-2">
          <input
            v-model="newIngredient"
            @keyup.enter="addIngredient"
            type="text"
            placeholder="Add ingredient"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
          <div class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="ingredient in selectedIngredients"
              :key="ingredient"
              class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100"
            >
              {{ ingredient }}
              <button
                @click="removeIngredient(ingredient)"
                class="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
  
      <!-- Cuisine -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-gray-700 mb-2">Cuisine</h4>
        <select
          v-model="selectedCuisine"
          class="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Any Cuisine</option>
          <option
            v-for="cuisine in cuisineOptions"
            :key="cuisine"
            :value="cuisine"
          >
            {{ cuisine }}
          </option>
        </select>
      </div>
  
      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <button
          @click="applyFilters"
          class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Apply Filters
        </button>
        <button
          @click="resetFilters"
          class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue'
  
  const emit = defineEmits(['filter-change'])
  
  const dietOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten Free', value: 'gluten-free' },
    { label: 'Dairy Free', value: 'dairy-free' },
  ]
  
  const cuisineOptions = [
    'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean',
    'Indian', 'French', 'Japanese', 'Thai', 'Greek'
  ]
  
  const selectedDiets = ref([])
  const cookingTime = ref(60)
  const selectedIngredients = ref([])
  const selectedCuisine = ref('')
  const newIngredient = ref('')
  
  const addIngredient = () => {
    if (newIngredient.value.trim()) {
      selectedIngredients.value.push(newIngredient.value.trim())
      newIngredient.value = ''
    }
  }
  
  const removeIngredient = (ingredient) => {
    selectedIngredients.value = selectedIngredients.value.filter(i => i !== ingredient)
  }
  
  const applyFilters = () => {
    emit('filter-change', {
      diets: selectedDiets.value,
      cookingTime: cookingTime.value,
      ingredients: selectedIngredients.value,
      cuisine: selectedCuisine.value
    })
  }
  
  const resetFilters = () => {
    selectedDiets.value = []
    cookingTime.value = 60
    selectedIngredients.value = []
    selectedCuisine.value = ''
    applyFilters()
  }
  </script>