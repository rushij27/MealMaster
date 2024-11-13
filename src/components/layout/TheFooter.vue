<template>
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Logo and description -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <font-awesome-icon icon="utensils" class="h-6 w-6 text-indigo-600" />
              <span class="text-xl font-bold text-gray-900">MealMaster</span>
            </div>
            <p class="text-gray-500 text-sm">
              Discover, plan, and cook delicious meals with ease.
              Your all-in-one kitchen companion.
            </p>
          </div>
  
          <!-- Quick links -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul class="space-y-3">
              <li v-for="link in quickLinks" :key="link.path">
                <router-link
                  :to="link.path"
                  class="text-gray-500 hover:text-gray-900 text-sm"
                >
                  {{ link.title }}
                </router-link>
              </li>
            </ul>
          </div>
  
          <!-- Contact -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Connect
            </h3>
            <ul class="space-y-3">
              <li v-for="item in socialLinks" :key="item.url">
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-500 hover:text-gray-900 text-sm flex items-center"
                >
                  <font-awesome-icon :icon="['fab', item.icon]" class="h-5 w-5 mr-2" />
                  {{ item.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-gray-400 text-sm text-center">
            © {{ new Date().getFullYear() }} MealMaster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  const quickLinks = [
    { path: '/', title: 'Home' },
    { path: '/recipes', title: 'Recipes' },
    { path: '/meal-planner', title: 'Meal Planner' },
    { path: '/shopping-list', title: 'Shopping List' },
  ]
  
  const socialLinks = [
    { url: '#', icon: 'facebook', title: 'Facebook' },
    { url: '#', icon: 'twitter', title: 'Twitter' },
    { url: '#', icon: 'instagram', title: 'Instagram' },
  ]
  </script>