// src/components/recipe/RecipeInstructions.vue
<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>

    <!-- Equipment Needed -->
    <div class="mb-6">
      <h4 class="text-lg font-medium text-gray-700 mb-2">Equipment Needed</h4>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="item in equipment"
          :key="item"
          class="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm"
        >
          <font-awesome-icon icon="utensils" class="mr-2" />
          {{ item }}
        </span>
      </div>
    </div>

    <!-- Step by Step Instructions -->
    <div class="space-y-6">
      <div
        v-for="(step, index) in instructions"
        :key="index"
        class="flex"
      >
        <div class="flex-shrink-0 mr-4">
          <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
            {{ index + 1 }}
          </div>
        </div>
        <div>
          <p class="text-gray-700">{{ step.instruction }}</p>
          <!-- Ingredients used in this step -->
          <div v-if="step.ingredients?.length" class="mt-2">
            <span class="text-sm font-medium text-gray-500">Ingredients used:</span>
            <div class="flex flex-wrap gap-2 mt-1">
              <span
                v-for="ingredient in formatIngredients(step.ingredients)"
                :key="ingredient.id"
                class="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-sm"
              >
                {{ ingredient.localizedName || ingredient.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div v-if="tips.length" class="mt-8">
      <h4 class="text-lg font-medium text-gray-700 mb-2">Cooking Tips</h4>
      <ul class="list-disc list-inside space-y-2 text-gray-600">
        <li v-for="tip in tips" :key="tip">{{ tip }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  instructions: {
    type: Array,
    required: true,
    validator: (instructions) => {
      return instructions.every(step => 'instruction' in step)
    }
  },
  equipment: {
    type: Array,
    default: () => []
  },
  tips: {
    type: Array,
    default: () => []
  }
})

// Helper function to format ingredients
const formatIngredients = (ingredients) => {
  // If ingredients is a string, try to parse it
  if (typeof ingredients === 'string') {
    try {
      ingredients = JSON.parse(ingredients)
    } catch (e) {
      console.error('Error parsing ingredients:', e)
      return []
    }
  }

  // Ensure ingredients is an array
  if (!Array.isArray(ingredients)) {
    ingredients = [ingredients]
  }

  // Filter out duplicates and empty ingredients
  return ingredients
    .filter(ingredient => ingredient && ingredient.name)
    .filter((ingredient, index, self) => 
      index === self.findIndex(i => i.name === ingredient.name)
    )
    .map(ingredient => ({
      id: ingredient.id || Math.random().toString(36).substr(2, 9),
      name: ingredient.name,
      localizedName: ingredient.localizedName || ingredient.name,
      image: ingredient.image || ''
    }))
}

// Example usage in a component:
// <recipe-instructions
//   :instructions="[
//     {
//       instruction: 'Heat the oil in a pan',
//       ingredients: [
//         { id: 4053, name: 'olive oil', localizedName: 'olive oil', image: 'olive-oil.jpg' },
//         { id: 0, name: 'soup', localizedName: 'soup', image: '' }
//       ]
//     }
//   ]"
// />
</script>