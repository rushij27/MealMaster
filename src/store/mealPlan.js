import { defineStore } from 'pinia'
import { mealPlannerAPI } from '@/api/mealPlanner'

export const useMealPlanStore = defineStore('mealPlan', {
  state: () => ({
    weeklyPlan: {
      // Structure: { [date]: { breakfast: [], lunch: [], dinner: [] } }
    },
    selectedWeek: null,
    loading: false,
    error: null,
    nutritionSummary: null
  }),

  getters: {
    getDateMeals: (state) => (date) => state.weeklyPlan[date] || { breakfast: [], lunch: [], dinner: [] },
    
    weeklyNutrition: (state) => {
      // Calculate weekly nutrition totals
      const totals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
      
      Object.values(state.weeklyPlan).forEach(day => {
        ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
          day[mealType]?.forEach(meal => {
            if (meal.nutrition) {
              totals.calories += meal.nutrition.calories || 0
              totals.protein += meal.nutrition.protein || 0
              totals.carbs += meal.nutrition.carbs || 0
              totals.fat += meal.nutrition.fat || 0
            }
          })
        })
      })
      
      return totals
    }
  },

  actions: {
    async fetchWeekPlan(startDate) {
        if (!userStore.username) {
            throw new Error('User not connected')
        }
      this.loading = true;
      try {
        const { data } = await mealPlannerAPI.getMealPlanWeek(userStore.username, startDate)
        this.weeklyPlan = data
        this.selectedWeek = startDate
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async addMealToPlan(date, mealType, recipe) {
      try {
        if (!this.weeklyPlan[date]) {
          this.weeklyPlan[date] = { breakfast: [], lunch: [], dinner: [] }
        }
        
        // Add meal to plan
        this.weeklyPlan[date][mealType].push({
          ...recipe,
          servings: recipe.servings || 1
        })

        // Update backend
        await mealPlannerAPI.addToMealPlan({
          date,
          mealType,
          recipeId: recipe.id,
          servings: recipe.servings
        })
      } catch (error) {
        this.error = error.message
        // Rollback on error
        this.weeklyPlan[date][mealType].pop()
      }
    },

    async removeMealFromPlan(date, mealType, recipeId) {
      try {
        if (!this.weeklyPlan[date]) return

        const mealIndex = this.weeklyPlan[date][mealType]
          .findIndex(meal => meal.id === recipeId)

        if (mealIndex !== -1) {
          this.weeklyPlan[date][mealType].splice(mealIndex, 1)
          await mealPlannerAPI.deleteFromMealPlan(date, mealType, recipeId)
        }
      } catch (error) {
        this.error = error.message
      }
    },

    async updateMealServings(date, mealType, recipeId, servings) {
      try {
        const meal = this.weeklyPlan[date][mealType]
          .find(meal => meal.id === recipeId)

        if (meal) {
          meal.servings = servings
          await mealPlannerAPI.updateMealPlan({
            date,
            mealType,
            recipeId,
            servings
          })
        }
      } catch (error) {
        this.error = error.message
      }
    },

    async generateShoppingList(startDate, endDate) {
      try {
        const { data } = await mealPlannerAPI.generateShoppingList(startDate, endDate)
        return data
      } catch (error) {
        this.error = error.message
        return null
      }
    },

    clearError() {
      this.error = null
    }
  },

  persist: {
    paths: ['weeklyPlan', 'selectedWeek']
  }
})