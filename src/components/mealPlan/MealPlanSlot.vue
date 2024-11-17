<template>
    <div class="meal-slot">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-sm font-medium text-gray-900 capitalize">{{ mealType }}</h3>
        <button
          v-if="!meals.length"
          @click="$emit('add-meal')"
          class="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Add Meal
        </button>
      </div>
  
      <div class="space-y-2">
        <div
          v-for="meal in meals"
          :key="meal.id"
          class="p-2 bg-gray-50 rounded-md"
        >
          <div class="flex justify-between items-start">
            <div class="flex-grow">
              <h4 class="text-sm font-medium text-gray-900">{{ meal.title }}</h4>
              <div class="flex items-center mt-1">
                <input
                  type="number"
                  v-model.number="meal.servings"
                  min="1"
                  class="w-16 px-2 py-1 text-sm border rounded-md"
                  @change="updateServings(meal)"
                >
                <span class="ml-2 text-sm text-gray-500">servings</span>
              </div>
            </div>
            <button
              @click="$emit('remove-meal', meal.id)"
              class="ml-2 text-gray-400 hover:text-gray-500"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    date: {
      type: Date,
      required: true
    },
    mealType: {
      type: String,
      required: true,
      validator: (value) => ['breakfast', 'lunch', 'dinner'].includes(value)
    },
    meals: {
      type: Array,
      default: () => []
    }
  })
  
  const emit = defineEmits(['add-meal', 'remove-meal', 'update-servings'])
  
  const updateServings = (meal) => {
    emit('update-servings', {
      recipeId: meal.id,
      servings: meal.servings
    })
  }
  </script>