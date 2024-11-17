<template>
  <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center bg-blue-50 rounded-lg">
    <!-- Left Image Section -->
    <div class="w-full h-96 lg:w-full mb-8 lg:mb-0 flex items-center justify-center">
      <img 
        src="@/assets/welcome.webp"
        alt="Delicious Cheesecake" 
        class="rounded-lg shadow-lg w-full h-auto max-h-96 lg:max-h-full object-cover"
      />
    </div>
    <!-- Right Text Section -->
    <div class="w-full lg:w-1/2 text-center p-6 lg:p-12">
      <h1 class="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">Welcome to KitchenSync</h1>
      <p class="text-sm lg:text-lg text-gray-600 mb-6">
        Discover, plan, and cook your favorite meals with ease. Your one-stop solution for meal planning, recipe discovery, and grocery management.
      </p>
      <router-link 
        to="/recipes" 
        class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm lg:text-base"
      >
        <font-awesome-icon icon="search" class="mr-2" />
        Find Recipes
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: auto;
  max-height: 100%;
}
</style>
