// src/components/recipe/RecipeNutrition.vue
<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Nutrition Information</h2>

    <!-- Nutrition Summary -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div
        v-for="(item, index) in mainNutrients"
        :key="index"
        class="bg-gray-50 p-4 rounded-lg text-center"
      >
        <div class="text-2xl font-bold text-gray-900">{{ item.value }}</div>
        <div class="text-sm text-gray-600">{{ item.name }}</div>
      </div>
    </div>

    <!-- Detailed Nutrients -->
    <div class="space-y-4">
      <!-- Macronutrients -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-3">Macronutrients</h3>
        <div class="space-y-2">
          <div
            v-for="nutrient in macronutrients"
            :key="nutrient.name"
            class="flex items-center"
          >
            <div class="flex-grow">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">
                  {{ nutrient.name }}
                </span>
                <span class="text-sm text-gray-600">
                  {{ nutrient.amount }}{{ nutrient.unit }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-indigo-600 h-2 rounded-full"
                  :style="{ width: `${nutrient.percentOfDaily}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vitamins and Minerals -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-3">Vitamins & Minerals</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="nutrient in micronutrients"
            :key="nutrient.name"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-700">{{ nutrient.name }}</span>
            <div class="flex items-center">
              <span class="text-sm font-medium text-gray-900">
                {{ nutrient.amount }}{{ nutrient.unit }}
              </span>
              <span 
                v-if="nutrient.percentOfDaily"
                class="ml-2 text-xs text-gray-500"
              >
                ({{ nutrient.percentOfDaily }}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Value Notice -->
      <div class="mt-6 text-xs text-gray-500">
        <p>* Percent Daily Values are based on a 2,000 calorie diet.</p>
        <p>Your daily values may be higher or lower depending on your calorie needs.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nutrition: {
    type: Object,
    required: true,
    validator: (nutrition) => {
      return nutrition?.nutrients?.length > 0
    }
  }
})

// Main nutrients displayed at the top
const mainNutrients = computed(() => {
  const nutrients = props.nutrition.nutrients
  return [
    {
      name: 'Calories',
      value: findNutrient('Calories')?.amount || '0'
    },
    {
      name: 'Protein',
      value: `${findNutrient('Protein')?.amount || '0'}g`
    },
    {
      name: 'Carbs',
      value: `${findNutrient('Carbohydrates')?.amount || '0'}g`
    },
    {
      name: 'Fat',
      value: `${findNutrient('Fat')?.amount || '0'}g`
    }
  ]
})

// Macronutrients with progress bars
const macronutrients = computed(() => {
  return [
    'Protein',
    'Carbohydrates',
    'Fat',
    'Fiber',
    'Sugar',
    'Saturated Fat'
  ].map(name => {
    const nutrient = findNutrient(name)
    return {
      name,
      amount: nutrient?.amount || 0,
      unit: nutrient?.unit || 'g',
      percentOfDaily: nutrient?.percentOfDailyNeeds || 0
    }
  })
})

// Vitamins and minerals
const micronutrients = computed(() => {
  return [
    'Vitamin A',
    'Vitamin C',
    'Vitamin D',
    'Vitamin E',
    'Vitamin K',
    'Calcium',
    'Iron',
    'Potassium',
    'Magnesium',
    'Zinc'
  ].map(name => {
    const nutrient = findNutrient(name)
    return {
      name,
      amount: nutrient?.amount || 0,
      unit: nutrient?.unit || 'mg',
      percentOfDaily: nutrient?.percentOfDailyNeeds || 0
    }
  })
})

// Helper function to find nutrient by name
const findNutrient = (name) => {
  return props.nutrition.nutrients.find(
    nutrient => nutrient.name.toLowerCase() === name.toLowerCase()
  )
}
</script>

<style scoped>
.nutrition-bar {
  transition: width 0.3s ease-in-out;
}
</style>