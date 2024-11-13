<template>
    <div>
      <label
        v-if="label"
        :for="id"
        class="block text-sm font-medium text-gray-700 mb-1"
      >
        {{ label }}
      </label>
  
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :class="[
          'block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md',
          'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
          { 'opacity-50 cursor-not-allowed': disabled }
        ]"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
  
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
  defineProps({
    modelValue: [String, Number],
    options: {
      type: Array,
      required: true,
      validator: (options) => options.every(option => 
        'value' in option && 'label' in option
      )
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
    error: String,
    id: {
      type: String,
      default: () => `select-${Math.random().toString(36).substr(2, 9)}`
    }
  })
  
  defineEmits(['update:modelValue'])
  </script>
  
  // src/components/common/AppModal.vue
  <template>
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="$emit('update:modelValue', false)"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
  
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <!-- Close button -->
            <button
              type="button"
              class="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              @click="$emit('update:modelValue', false)"
            >
              <span class="sr-only">Close</span>
              <font-awesome-icon icon="times" class="h-6 w-6" />
            </button>
  
            <!-- Title -->
            <div v-if="title" class="mb-4">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
              </h3>
            </div>
  
            <!-- Content -->
            <div class="mt-2">
              <slot></slot>
            </div>
  
            <!-- Footer -->
            <div v-if="$slots.footer" class="mt-5 sm:mt-6">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    modelValue: Boolean,
    title: String
  })
  
  defineEmits(['update:modelValue'])
  </script>