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
      <!-- Updated Spinner -->
      <svg
        class="animate-spin text-blue-500"
        :class="sizeClasses[size]"
        viewBox="0 0 100 100"
      >
        <!-- Static background circle -->
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="#E2E8F0"
          stroke-width="8"
          fill="none"
        />
        
        <!-- Animated blue arc -->
        <circle 
          cx="50" 
          cy="50" 
          r="45"
          stroke="currentColor"
          stroke-width="8"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="283,283"
          stroke-dashoffset="283"
          class="origin-center"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="283;70;283"
            dur="1.6s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
          />
        </circle>
      </svg>

      <!-- Text -->
      <span
        v-if="text"
        class="ml-3 text-gray-700"
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

// Updated size classes for the new viewBox dimensions
const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
}
</script>