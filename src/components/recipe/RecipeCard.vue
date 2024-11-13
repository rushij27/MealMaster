<template>
    <div class="recipe-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <!-- Recipe Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          :src="recipe.image"
          :alt="recipe.title"
          class="w-full h-full object-cover"
          @error="handleImageError"
        >
        <!-- Recipe Time Badge -->
        <div class="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-sm">
          <font-awesome-icon icon="clock" class="mr-1" />
          {{ recipe.readyInMinutes }} min
        </div>
      </div>
  
      <!-- Recipe Content -->
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ recipe.title }}
        </h3>
  
        <!-- Recipe Meta -->
        <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span class="flex items-center">
            <font-awesome-icon icon="utensils" class="mr-1" />
            {{ recipe.servings }} servings
          </span>
          <span class="flex items-center">
            <font-awesome-icon :icon="['far', 'heart']" class="mr-1" />
            {{ recipe.aggregateLikes }}
          </span>
        </div>
  
        <!-- Recipe Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="tag in recipeTags"
            :key="tag"
            class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
          >
            {{ tag }}
          </span>
        </div>
  
        <!-- Action Buttons -->
        <div class="flex justify-between items-center">
          <button
            @click="$emit('view-recipe', recipe.id)"
            class="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
          >
            View Recipe
          </button>
          <button
            @click="$emit('toggle-favorite', recipe.id)"
            class="text-gray-400 hover:text-red-500 transition-colors duration-200"
            :class="{ 'text-red-500': recipe.isFavorite }"
          >
            <font-awesome-icon :icon="['fas', 'heart']" class="text-xl" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    recipe: {
      type: Object,
      required: true,
      validator: (recipe) => {
        return ['id', 'title', 'image', 'readyInMinutes', 'servings'].every(
          prop => prop in recipe
        )
      }
    }
  })
  
  const emit = defineEmits(['view-recipe', 'toggle-favorite'])
  
  const recipeTags = computed(() => {
    const tags = []
    if (props.recipe.vegetarian) tags.push('Vegetarian')
    if (props.recipe.vegan) tags.push('Vegan')
    if (props.recipe.glutenFree) tags.push('Gluten Free')
    if (props.recipe.dairyFree) tags.push('Dairy Free')
    return tags
  })
  
  const handleImageError = (e) => {
    e.target.src = '/default-recipe-image.jpg' // Replace with your default image
  }
  </script>