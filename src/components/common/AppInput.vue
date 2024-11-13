<template>
    <div>
      <label
        v-if="label"
        :for="id"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ label }}
      </label>
      
      <div class="relative">
        <!-- Icon (if provided) -->
        <div
          v-if="icon"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <font-awesome-icon :icon="icon" class="text-gray-400" />
        </div>
  
        <input
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="[
            'block w-full rounded-md shadow-sm transition-colors duration-200',
            'focus:ring-indigo-500 focus:border-indigo-500',
            'border-gray-300',
            { 'opacity-50 cursor-not-allowed': disabled },
            { 'pl-10': icon },
            errorClasses
          ]"
          @input="$emit('update:modelValue', $event.target.value)"
          @blur="$emit('blur', $event)"
        >
  
        <!-- Error icon -->
        <div
          v-if="error"
          class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
        >
          <font-awesome-icon icon="exclamation-circle" class="text-red-500" />
        </div>
      </div>
  
      <!-- Error message -->
      <p
        v-if="error"
        class="mt-1 text-sm text-red-600"
      >
        {{ error }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    modelValue: String,
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    disabled: Boolean,
    error: String,
    icon: String,
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
  })
  
  defineEmits(['update:modelValue', 'blur'])
  
  const errorClasses = computed(() => 
    props.error ? 'border-red-300 text-red-900 placeholder-red-300' : ''
  )
  </script>