<template>
    <div v-if="recipe" class="recipe-details">
      <!-- Hero Section -->
      <div class="relative h-96 mb-8">
        <img
          :src="recipe.image"
          :alt="recipe.title"
          class="w-full h-full object-cover rounded-lg"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
        <div class="absolute bottom-0 p-6 text-white">
          <h1 class="text-4xl font-bold mb-4">{{ recipe.title }}</h1>
          <div class="flex flex-wrap gap-4">
            <span class="flex items-center">
              <font-awesome-icon icon="clock" class="mr-2" />
              {{ recipe.readyInMinutes }} minutes
            </span>
            <span class="flex items-center">
              <font-awesome-icon icon="utensils" class="mr-2" />
              {{ recipe.servings }} servings
            </span>
            <span class="flex items-center">
              <font-awesome-icon icon="heart" class="mr-2" />
              {{ recipe.aggregateLikes }} likes
            </span>
          </div>
        </div>
      </div>
  
      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Ingredients & Nutrition -->
        <div class="space-y-8">
          <!-- Ingredients -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-2xl font-semibold mb-4">Ingredients</h2>
            <ul class="space-y-3">
              <li
                v-for="ingredient in recipe.extendedIngredients"
                :key="ingredient.id"
                class="flex items-start"
              >
                <font-awesome-icon icon="check" class="mt-1 mr-3 text-green-500" />
                <span>
                  {{ ingredient.amount }} {{ ingredient.unit }}
                  <span class="font-medium">{{ ingredient.name }}</span>
                </span>
              </li>
            </ul>
            <button
              @click="addToShoppingList"
              class="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add to Shopping List
            </button>
          </div>
  
          <!-- Nutrition -->
          <recipe-nutrition :nutrition="recipe.nutrition" />
        </div>
  
        <!-- Right Column - Instructions & Notes -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div v-html="recipe.summary" class="prose max-w-none"></div>
          </div>
  
          <!-- Instructions -->
          <recipe-instructions
            :instructions="recipe.analyzedInstructions[0]?.steps || []"
            :equipment="recipe.equipment"
          />
  
          <!-- Notes and Tips -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-2xl font-semibold mb-4">Notes & Tips</h2>
            <div class="space-y-4">
              <div v-if="recipe.winePairing" class="text-gray-700">
                <h3 class="text-lg font-medium mb-2">Wine Pairing</h3>
                <p>{{ recipe.winePairing.pairingText }}</p>
              </div>
              <div v-if="recipe.tips" class="text-gray-700">
                <h3 class="text-lg font-medium mb-2">Cooking Tips</h3>
                <ul class="list-disc list-inside space-y-2">
                  <li v-for="(tip, index) in recipe.tips" :key="index">
                    {{ tip }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Loading State -->
    <div v-else-if="loading" class="flex justify-center items-center h-96">
      <app-loader size="lg" />
    </div>
  
    <!-- Error State -->
    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-semibold text-gray-900 mb-2">Recipe Not Found</h2>
      <p class="text-gray-600 mb-6">The recipe you're looking for might have been removed or doesn't exist.</p>
      <router-link
        to="/recipes"
        class="inline-flex items-center text-indigo-600 hover:text-indigo-700"
      >
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        Back to Recipes
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { recipeAPI } from '../../api/recipes'
  import RecipeNutrition from '../../components/recipe/RecipeNutrition.vue'
  import RecipeInstructions from '../../components/recipe/RecipeInstructions.vue'
  import AppLoader from '../../components/common/AppLoader.vue'
  
  const route = useRoute()
  const router = useRouter()
  const recipe = ref(null)
  const loading = ref(true)
  
  const fetchRecipeDetails = async () => {
    loading.value = true
    try {
      const { data } = await recipeAPI.getRecipeById(route.params.id)
      recipe.value = data
    } catch (error) {
      console.error('Error fetching recipe details:', error)
      recipe.value = null
    } finally {
      loading.value = false
    }
  }
  
  const addToShoppingList = async () => {
    // Implement shopping list logic
  }
  
  onMounted(() => {
    fetchRecipeDetails()
  })
  </script>