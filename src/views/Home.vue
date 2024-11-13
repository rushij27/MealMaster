<template>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Welcome to Meal Master</h1>
      <div class="text-center">
        <router-link 
          to="/recipes" 
          class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <font-awesome-icon icon="search" class="mr-2" />
          Find Recipes
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  // No additional logic needed for Home
  </script>