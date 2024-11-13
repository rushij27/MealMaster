import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: () => import('../views/Recipes/RecipeSearch.vue'),
    },
    {
      path: '/recipes/:id',
      name: 'RecipeDetails',
      component: () => import('../views/Recipes/RecipeDetails.vue'),
    },
    {
      path: '/recipes/saved',
      name: 'RecipeSaved',
      component: () => import('../views/Recipes/RecipeSaved.vue'),
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
})

export default router
