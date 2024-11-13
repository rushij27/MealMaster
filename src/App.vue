<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <TheHeader @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar -->
    <TheSidebar 
      :is-open="isSidebarOpen" 
      @close="closeSidebar" 
    />

    <!-- Main Content -->
    <main class="flex-grow pt-16 pb-16 lg:pb-0 lg:pl-64">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <router-view v-slot="{ Component }">
          <transition 
            name="fade" 
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>

    <!-- Mobile Navigation -->
    <TheNavigation />

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheNavigation from './components/layout/TheNavigation.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style>
/* Base styles */
:root {
  --header-height: 4rem;
  --footer-height: auto;
  --sidebar-width: 16rem;
}

/* Layout transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Sidebar transitions */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Mobile optimization */
@media (max-width: 1024px) {
  .main-content {
    padding-left: 0;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  .main-content {
    padding: 0 !important;
    margin: 0 !important;
  }
}

/* Focus outline styles */
:focus {
  outline: 2px solid theme('colors.indigo.500');
  outline-offset: 2px;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Touch device optimizations */
@media (hover: none) {
  .hover\:bg-gray-100:hover {
    background-color: transparent;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Common utility classes */
.flex-center {
  @apply flex items-center justify-center;
}

.text-overflow {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}

.transition-default {
  @apply transition-all duration-200 ease-in-out;
}

.card {
  @apply bg-white rounded-lg shadow-sm p-4;
}

.btn-reset {
  @apply appearance-none border-none bg-transparent p-0 m-0 cursor-pointer;
}
</style>