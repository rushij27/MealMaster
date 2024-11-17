// src/views/MealPlanner/components/MealPlanNutritionSummary.vue
<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg font-medium text-gray-900">Weekly Nutrition Summary</h3>
      <div class="flex items-center space-x-2">
        <span 
          class="text-sm text-gray-500"
          v-tooltip="'Based on selected serving sizes'"
        >
          {{ getTotalCalories }} calories/week
        </span>
        <button 
          @click="showDetails = !showDetails"
          class="text-indigo-600 hover:text-indigo-700"
        >
          <font-awesome-icon 
            :icon="showDetails ? 'chevron-up' : 'chevron-down'" 
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>

    <!-- Main Nutrition Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div
        v-for="(nutrient, index) in mainNutrients"
        :key="index"
        class="bg-gray-50 rounded-lg p-4"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">{{ nutrient.name }}</span>
          <span 
            class="text-xs px-2 py-1 rounded-full"
            :class="getNutrientStatusClass(nutrient)"
          >
            {{ getNutrientStatus(nutrient) }}
          </span>
        </div>
        <div class="mt-2">
          <span class="text-2xl font-bold text-gray-900">
            {{ formatNutrientValue(nutrient.value) }}
          </span>
          <span class="text-sm text-gray-500 ml-1">{{ nutrient.unit }}</span>
        </div>
        <div class="mt-2">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="h-2 rounded-full"
              :class="getNutrientProgressClass(nutrient)"
              :style="{ width: `${getNutrientPercentage(nutrient)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Breakdown -->
    <div v-if="showDetails" class="space-y-6">
      <!-- Daily Distribution -->
      <div>
        <h4 class="text-sm font-medium text-gray-900 mb-3">Daily Distribution</h4>
        <div class="space-y-3">
          <div 
            v-for="day in dailyBreakdown" 
            :key="day.date"
            class="flex items-center"
          >
            <span class="w-24 text-sm text-gray-500">{{ formatDate(day.date) }}</span>
            <div class="flex-grow">
              <div class="flex items-center">
                <div class="flex-grow">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-indigo-600 h-2 rounded-full"
                      :style="{ width: `${(day.calories / recommendedDaily.calories) * 100}%` }"
                    ></div>
                  </div>
                </div>
                <span class="ml-2 text-sm text-gray-600">
                  {{ day.calories }} cal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meal Type Distribution -->
      <div>
        <h4 class="text-sm font-medium text-gray-900 mb-3">Meal Distribution</h4>
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(meal, type) in mealTypeBreakdown"
            :key="type"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="text-sm font-medium text-gray-900 capitalize mb-1">
              {{ type }}
            </div>
            <div class="text-2xl font-bold text-gray-900">
              {{ Math.round(meal.percentage) }}%
            </div>
            <div class="text-sm text-gray-500">
              {{ meal.calories }} cal
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  nutrition: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['calories', 'protein', 'carbs', 'fat'].every(prop => prop in value)
    }
  }
})

// State
const showDetails = ref(false)

// Constants
const recommendedDaily = {
  calories: 2000,
  protein: 50,  // grams
  carbs: 275,   // grams
  fat: 78       // grams
}

// Computed
const mainNutrients = computed(() => [
  {
    name: 'Calories',
    value: props.nutrition.calories,
    unit: 'kcal',
    recommended: recommendedDaily.calories * 7, // weekly
    min: recommendedDaily.calories * 7 * 0.8,
    max: recommendedDaily.calories * 7 * 1.2
  },
  {
    name: 'Protein',
    value: props.nutrition.protein,
    unit: 'g',
    recommended: recommendedDaily.protein * 7,
    min: recommendedDaily.protein * 7 * 0.8,
    max: recommendedDaily.protein * 7 * 1.2
  },
  {
    name: 'Carbs',
    value: props.nutrition.carbs,
    unit: 'g',
    recommended: recommendedDaily.carbs * 7,
    min: recommendedDaily.carbs * 7 * 0.8,
    max: recommendedDaily.carbs * 7 * 1.2
  },
  {
    name: 'Fat',
    value: props.nutrition.fat,
    unit: 'g',
    recommended: recommendedDaily.fat * 7,
    min: recommendedDaily.fat * 7 * 0.8,
    max: recommendedDaily.fat * 7 * 1.2
  }
])

const getTotalCalories = computed(() => {
  return Math.round(props.nutrition.calories)
})

const dailyBreakdown = computed(() => {
  return props.nutrition.dailyBreakdown || []
})

const mealTypeBreakdown = computed(() => {
  const total = props.nutrition.calories
  return {
    breakfast: {
      calories: props.nutrition.breakfastCalories || 0,
      percentage: (props.nutrition.breakfastCalories / total) * 100 || 0
    },
    lunch: {
      calories: props.nutrition.lunchCalories || 0,
      percentage: (props.nutrition.lunchCalories / total) * 100 || 0
    },
    dinner: {
      calories: props.nutrition.dinnerCalories || 0,
      percentage: (props.nutrition.dinnerCalories / total) * 100 || 0
    }
  }
})

// Methods
const formatDate = (date) => {
  return format(new Date(date), 'EEE')
}

const formatNutrientValue = (value) => {
  return Math.round(value)
}

const getNutrientPercentage = (nutrient) => {
  return Math.min((nutrient.value / nutrient.recommended) * 100, 100)
}

const getNutrientStatus = (nutrient) => {
  if (nutrient.value < nutrient.min) return 'Low'
  if (nutrient.value > nutrient.max) return 'High'
  return 'Good'
}

const getNutrientStatusClass = (nutrient) => {
  const status = getNutrientStatus(nutrient)
  return {
    'bg-red-100 text-red-800': status === 'High',
    'bg-yellow-100 text-yellow-800': status === 'Low',
    'bg-green-100 text-green-800': status === 'Good'
  }
}

const getNutrientProgressClass = (nutrient) => {
  const status = getNutrientStatus(nutrient)
  return {
    'bg-red-500': status === 'High',
    'bg-yellow-500': status === 'Low',
    'bg-green-500': status === 'Good'
  }
}
</script>

<style scoped>
.nutrition-progress {
  transition: width 0.3s ease-in-out;
}
</style>