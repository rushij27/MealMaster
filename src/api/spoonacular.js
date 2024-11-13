import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: process.env.VUE_APP_SPOONACULAR_API_KEY
  }
})

export const recipeAPI = {
  searchRecipes(query, filters = {}) {
    return api.get('/recipes/complexSearch', { params: { query, ...filters } })
  },
  
  getRecipeDetails(id) {
    return api.get(`/recipes/${id}/information`)
  },
  
  getRandomRecipes(number = 10) {
    return api.get('/recipes/random', { params: { number } })
  },
  
  searchByIngredients(ingredients) {
    return api.get('/recipes/findByIngredients', { params: { ingredients } })
  }
}

export const mealPlannerAPI = {
  generateMealPlan(timeFrame, diet, calories) {
    return api.get('/mealplanner/generate', {
      params: { timeFrame, diet, targetCalories: calories }
    })
  },
  
  generateShoppingList(startDate, endDate) {
    return api.get('/mealplanner/shopping-list', {
      params: { start: startDate, end: endDate }
    })
  }
}