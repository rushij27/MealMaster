<template>
    <div
      :class="[
        'flex items-center justify-center',
        { 'fixed inset-0 bg-black bg-opacity-50 z-50': overlay }
      ]"
    >
      <div
        :class="[
          'inline-flex items-center px-4 py-2 rounded-md',
          { 'bg-white shadow-xl': overlay }
        ]"
      >
        <!-- Spinner -->
        <svg
          class="animate-spin"
          :class="sizeClasses[size]"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            fill="none"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
  
        <!-- Text -->
        <span
          v-if="text"
          class="ml-2 text-gray-700"
        >
          {{ text }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    overlay: Boolean,
    text: String
  })
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }
  </script>