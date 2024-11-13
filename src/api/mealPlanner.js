import api from './index'

export const mealPlannerAPI = {
  // Generate meal plan
  generateMealPlan(params) {
    return api.get('/mealplanner/generate', { params })
  },

  // Generate meal plan with specific parameters
  generateCustomMealPlan(data) {
    return api.post('/mealplanner/generate', data)
  },

  // Get meal plan templates
  getMealPlanTemplates(username) {
    return api.get(`/mealplanner/${username}/templates`)
  },

  // Add meal plan template
  addMealPlanTemplate(username, data) {
    return api.post(`/mealplanner/${username}/templates`, data)
  },

  // Get meal plan week
  getMealPlanWeek(username, startDate) {
    return api.get(`/mealplanner/${username}/week/${startDate}`)
  },

  // Get meal plan day
  getMealPlanDay(username, date) {
    return api.get(`/mealplanner/${username}/day/${date}`)
  },

  // Add to meal plan
  addToMealPlan(username, data) {
    return api.post(`/mealplanner/${username}/items`, data)
  },

  // Delete from meal plan
  deleteFromMealPlan(username, id) {
    return api.delete(`/mealplanner/${username}/items/${id}`)
  }
}