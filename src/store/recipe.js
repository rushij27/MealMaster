// src/stores/recipe.js (Note: it's stores, not store)
import { defineStore } from 'pinia'
import { recipeAPI } from '@/api/recipes'

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    savedRecipes: [],
    recentlyViewed: [],
    searchResults: [],
    currentRecipe: null,
    loading: false,
    error: null
  }),

  actions: {
    async searchRecipes(query) {
      this.loading = true
      try {
        const response = await recipeAPI.searchRecipes({ query })
        this.searchResults = response.data.results
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async getRecipeDetails(id) {
      this.loading = true
      try {
        const response = await recipeAPI.getRecipeById(id)
        this.currentRecipe = response.data
        this.addToRecentlyViewed(response.data)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    addToRecentlyViewed(recipe) {
      const exists = this.recentlyViewed.find(r => r.id === recipe.id)
      if (!exists) {
        this.recentlyViewed = [recipe, ...this.recentlyViewed].slice(0, 10)
      }
    },

    toggleSaveRecipe(recipe) {
      const index = this.savedRecipes.findIndex(r => r.id === recipe.id)
      if (index === -1) {
        this.savedRecipes.push(recipe)
      } else {
        this.savedRecipes.splice(index, 1)
      }
    },

    isRecipeSaved(recipeId) {
      return this.savedRecipes.some(recipe => recipe.id === recipeId)
    }
  },

  persist: {
    paths: ['savedRecipes', 'recentlyViewed']
  }
})