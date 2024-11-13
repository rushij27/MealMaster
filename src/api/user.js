import api from './index'

export const userAPI = {
  // Connect user
  connectUser(username) {
    return api.post('/users/connect', { username })
  },

  // Get user preferences
  getUserPreferences(username) {
    return api.get(`/users/${username}/preferences`)
  },

  // Update user preferences
  updateUserPreferences(username, preferences) {
    return api.put(`/users/${username}/preferences`, preferences)
  },

  // Get meal plan status
  getMealPlanStatus(username) {
    return api.get(`/users/${username}/mealPlanner/status`)
  },

  // Get user custom foods
  getCustomFoods(username) {
    return api.get(`/users/${username}/customFoods`)
  },

  // Add custom food
  addCustomFood(username, data) {
    return api.post(`/users/${username}/customFoods`, data)
  },

  // Delete custom food
  deleteCustomFood(username, id) {
    return api.delete(`/users/${username}/customFoods/${id}`)
  }
}