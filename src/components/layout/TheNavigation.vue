<template>
    <nav class="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40 lg:hidden">
      <div class="max-w-screen-xl mx-auto px-4">
        <div class="flex justify-around">
          <router-link
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="flex flex-col items-center py-3 px-4 text-gray-500 hover:text-gray-900"
            :class="{ 'text-indigo-600': isCurrentRoute(item.path) }"
          >
            <font-awesome-icon :icon="item.icon" class="h-6 w-6" />
            <span class="text-xs mt-1">{{ item.title }}</span>
          </router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const navigationItems = [
    { path: '/', title: 'Home', icon: 'home' },
    { path: '/recipes', title: 'Search', icon: 'search' },
    { path: '/meal-planner', title: 'Planner', icon: 'calendar' },
    { path: '/shopping-list', title: 'List', icon: 'shopping-cart' },
    { path: '/profile', title: 'Profile', icon: 'user' },
  ]
  
  const isCurrentRoute = (path) => {
    return route.path === path
  }
  </script>