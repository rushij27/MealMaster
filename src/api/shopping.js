import api from './index'

export const shoppingAPI = {
  // Generate shopping list
  generateShoppingList(username, startDate, endDate) {
    return api.post(`/mealplanner/${username}/shopping-list`, {
      start: startDate,
      end: endDate
    })
  },

  // Get current shopping list
  getShoppingList(username) {
    return api.get(`/mealplanner/${username}/shopping-list`)
  },

  // Add item to shopping list
  addToShoppingList(username, data) {
    return api.post(`/mealplanner/${username}/shopping-list/items`, data)
  },

  // Delete item from shopping list
  deleteFromShoppingList(username, id) {
    return api.delete(`/mealplanner/${username}/shopping-list/items/${id}`)
  },

  // Parse ingredients
  parseIngredients(ingredients) {
    return api.post('/recipes/parseIngredients', ingredients)
  },

  // Compute shopping list
  computeShoppingList(data) {
    return api.post('/recipes/computeShoppingList', data)
  }
}