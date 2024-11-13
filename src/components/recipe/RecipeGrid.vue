<template>
    <div>
      <!-- Grid Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ title }}
        </h2>
        <div class="flex items-center space-x-4">
          <!-- Sort Select -->
          <select
            v-model="sortBy"
            class="rounded-md border-gray-300 py-1 pl-3 pr-8 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Most Recent</option>
            <option value="time">Cooking Time</option>
          </select>
        </div>
      </div>
  
      <!-- Grid Layout -->
      <div
        v-if="recipes.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <recipe-card
          v-for="recipe in sortedRecipes"
          :key="recipe.id"
          :recipe="recipe"
          @view-recipe="$emit('view-recipe', $event)"
          @toggle-favorite="$emit('toggle-favorite', $event)"
        />
      </div>
  
      <!-- Empty State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg"
      >
        <font-awesome-icon icon="utensils" class="text-4xl text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-1">No Recipes Found</h3>
        <p class="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
  
      <!-- Loading State -->
      <div
        v-if="loading"
        class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center"
      >
        <app-loader size="lg" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watch } from 'vue'
  import RecipeCard from './RecipeCard.vue'
  import AppLoader from '../common/AppLoader.vue'
  
  const props = defineProps({
    recipes: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Recipes'
    },
    loading: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['view-recipe', 'toggle-favorite'])
  
  const sortBy = ref('popular')
  
  const sortedRecipes = computed(() => {
    return [...props.recipes].sort((a, b) => {
      switch (sortBy.value) {
        case 'popular':
          return b.aggregateLikes - a.aggregateLikes
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'time':
          return a.readyInMinutes - b.readyInMinutes
        default:
          return 0
      }
    })
  })
  </script>