import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: 'KitchenSync - Your Smart Kitchen Companion'
      }
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('../views/Recipes/RecipeSearch.vue'),
      meta: {
        title: 'Search Recipes | KitchenSync'
      },
    },
    {
      path: '/recipes/:id',
      name: 'RecipeDetails',
      component: () => import('../views/Recipes/RecipeDetails.vue'),
      meta: {
        title: 'Recipe Details | KitchenSync'
      }
    },
    {
      path: '/recipes/saved',
      name: 'RecipeSaved',
      component: () => import('../views/Recipes/RecipeSaved.vue'),
      meta: {
        title: 'Saved Recipes | KitchenSync'
      }
    },
    {
      path: '/meal-planner',
      name: 'MealPlanner',
      component: () => import('../views/MealPlanner/MealPlannerView.vue'),
      meta: {
        title: 'Meal Planner | KitchenSync'
      }
    },
    {
      path: '/shopping-list',
      name: 'ShoppingList',
      component: () => import('../views/Shopping/ShoppingListView.vue'),
      meta: {
        title: 'Shopping List | KitchenSync'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Default title if none is specified
  const defaultTitle = 'KitchenSync - Your Smart Kitchen Companion'
  
  // For recipe details, we'll update the title when the data is loaded
  if (to.name === 'RecipeDetails') {
    document.title = 'Loading Recipe... | KitchenSync'
  } else {
    // Set the meta title from route meta, or use default
    document.title = to.meta.title || defaultTitle
  }
  
  next()
})

export default router
