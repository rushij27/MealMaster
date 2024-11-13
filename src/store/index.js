import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    favorites: [],
    mealPlan: {},
    shoppingList: [],
    searchHistory: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    addToFavorites(state, recipe) {
      state.favorites.push(recipe)
    },
    updateMealPlan(state, mealPlan) {
      state.mealPlan = mealPlan
    },
    updateShoppingList(state, list) {
      state.shoppingList = list
    },
    addToSearchHistory(state, search) {
      state.searchHistory.push(search)
    }
  },
  actions: {
    // Actions will contain API calls
  }
})