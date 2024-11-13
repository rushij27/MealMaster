<template>
    <div
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        { '-translate-x-full': !isOpen },
        { 'translate-x-0': isOpen }
      ]"
    >
      <!-- Sidebar Header -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Menu</h2>
        <button
          class="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          @click="$emit('close')"
        >
          <font-awesome-icon icon="times" class="h-6 w-6" />
        </button>
      </div>
  
      <!-- Navigation -->
      <nav class="px-4 py-4">
        <!-- Main Navigation -->
        <div class="space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-2 py-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            :class="{ 'bg-gray-100 text-gray-900': isCurrentRoute(item.path) }"
          >
            <font-awesome-icon :icon="item.icon" class="h-5 w-5 mr-3" />
            {{ item.title }}
          </router-link>
        </div>
  
        <!-- Categories -->
        <div class="mt-8">
          <h3 class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categories
          </h3>
          <div class="mt-2 space-y-1">
            <router-link
              v-for="category in categories"
              :key="category.path"
              :to="category.path"
              class="flex items-center px-2 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
            >
              {{ category.title }}
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const props = defineProps({
    isOpen: Boolean
  })
  
  defineEmits(['close'])
  
  const route = useRoute()
  
  const navigationItems = [
    { path: '/', title: 'Home', icon: 'home' },
    { path: '/recipes', title: 'Recipes', icon: 'book' },
    { path: '/meal-planner', title: 'Meal Planner', icon: 'calendar' },
    { path: '/shopping-list', title: 'Shopping List', icon: 'shopping-cart' },
    { path: '/favorites', title: 'Favorites', icon: 'heart' },
  ]
  
  const categories = [
    { path: '/category/breakfast', title: 'Breakfast' },
    { path: '/category/lunch', title: 'Lunch' },
    { path: '/category/dinner', title: 'Dinner' },
    { path: '/category/desserts', title: 'Desserts' },
    { path: '/category/snacks', title: 'Snacks' },
  ]
  
  const isCurrentRoute = (path) => {
    return route.path === path
  }
  </script>