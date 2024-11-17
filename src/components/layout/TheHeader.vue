// src/components/layout/TheHeader.vue
<template>
  <header class="bg-white shadow-sm fixed w-full top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Left section -->
        <div class="flex">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            @click="toggleSidebar"
          >
            <span class="sr-only">Open menu</span>
            <font-awesome-icon icon="bars" class="h-6 w-6" />
          </button>

          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <font-awesome-icon icon="utensils" class="h-8 w-8 text-indigo-600" />
              <span class="text-2xl font-bold text-gray-900">MealMaster</span>
            </router-link>
          </div>
        </div>

        <!-- Search bar -->
        <div class="flex-1 max-w-2xl mx-4 hidden md:flex">
          <div class="w-full">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search recipes..."
                class="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                @keyup.enter="handleSearch"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <font-awesome-icon icon="search" class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-4">
          <!-- Navigation Icons -->
          <nav class="hidden md:flex space-x-4">
            <router-link
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              :title="item.title"
            >
              <font-awesome-icon :icon="item.icon" class="h-5 w-5" />
            </router-link>
          </nav>

          <!-- User Menu -->
          <div class="relative">
            <button
              type="button"
              @click="toggleUserMenu"
              class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <font-awesome-icon :icon="['fas', 'user']" class="h-5 w-5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md"/>
            </button>

            <!-- Dropdown menu -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isUserMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <router-link
                    v-for="item in userMenuItems"
                    :key="item.path"
                    :to="item.path"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="closeUserMenu"
                  >
                    {{ item.title }}
                  </router-link>
                  <button
                    type="button"
                    class="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                    @click="handleLogout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const isUserMenuOpen = ref(false)

const navigationItems = [
  { path: '/favorites', title: 'Favorites', icon: 'heart' },
  { path: '/meal-planner', title: 'Meal Planner', icon: 'calendar' },
  { path: '/shopping-list', title: 'Shopping List', icon: 'shopping-cart' },
]

const userMenuItems = [
  { path: '/profile', title: 'Profile' },
  { path: '/settings', title: 'Settings' },
]

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'RecipeSearch', query: { q: searchQuery.value } })
    searchQuery.value = ''
  }
}

const handleLogout = () => {
  // Implement logout logic here
  closeUserMenu()
}

const emit = defineEmits(['toggle-sidebar'])
</script>

<style scoped>
/* Add any component-specific styles here */
.user-menu-enter-active,
.user-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>