import api from './index'

export const recipeAPI = {
  // Search recipes with complex parameters
  searchRecipes(params) {
    return api.get('/recipes/complexSearch', { params })
  },

  // Get recipe information by ID
  getRecipeById(id, includeNutrition = true) {
    return api.get(`/recipes/${id}/information`, {
      params: { includeNutrition }
    })
  },

  // Get multiple recipe information
  getRecipesBulk(ids) {
    return api.get(`/recipes/informationBulk`, {
      params: { ids: ids.join(',') }
    })
  },

  // Search recipes by ingredients
  searchByIngredients(ingredients, params = {}) {
    return api.get('/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        ...params
      }
    })
  },

  // Get random recipes
  getRandomRecipes(params = {}) {
    return api.get('/recipes/random', { params })
  },

  // Get recipe nutrition by ID
  getRecipeNutrition(id) {
    return api.get(`/recipes/${id}/nutritionWidget.json`)
  },

  // Get recipe equipment by ID
  getRecipeEquipment(id) {
    return api.get(`/recipes/${id}/equipmentWidget.json`)
  },

  // Get similar recipes
  getSimilarRecipes(id, number = 5) {
    return api.get(`/recipes/${id}/similar`, {
      params: { number }
    })
  },

  // Analyze a recipe (URL or text)
  analyzeRecipe(data) {
    return api.post('/recipes/analyze', data)
  }
}