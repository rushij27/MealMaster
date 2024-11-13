<template>
    <div class="recipe-card">
      <img :src="recipe.image" :alt="recipe.title">
      <div class="recipe-info">
        <h3>{{ recipe.title }}</h3>
        <div class="recipe-meta">
          <span>Ready in {{ recipe.readyInMinutes }} mins</span>
          <span>{{ recipe.servings }} servings</span>
        </div>
        <div class="recipe-actions">
          <button @click="$emit('view-details')">View Details</button>
          <button @click="$emit('add-to-favorites')">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
    name: 'RecipeCard',
    props: {
        recipe: {
        type: Object,
        required: true
        }
    }
    }
</script>