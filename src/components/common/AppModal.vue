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
      @click.self="handleBackdropClick"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      <!-- Modal Content -->
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="modelValue"
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full"
            :class="sizeClasses[size]"
          >
            <!-- Close Button -->
            <button
              v-if="showClose"
              type="button"
              class="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              @click="handleClose"
            >
              <span class="sr-only">Close</span>
              <font-awesome-icon icon="times" class="h-6 w-6" />
            </button>

            <!-- Modal Header -->
            <div v-if="title" class="bg-white px-4 pb-4 pt-5 sm:p-6 border-b">
              <h3 class="text-lg font-semibold leading-6 text-gray-900">
                {{ title }}
              </h3>
              <p v-if="description" class="mt-2 text-sm text-gray-500">
                {{ description }}
              </p>
            </div>

            <!-- Modal Body -->
            <div :class="[
              'px-4 pb-4 pt-5 sm:p-6',
              { 'max-h-[calc(100vh-200px)] overflow-y-auto': scrollable }
            ]">
              <slot></slot>
            </div>

            <!-- Modal Footer -->
            <div
              v-if="$slots.footer"
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  showClose: {
    type: Boolean,
    default: true
  },
  scrollable: {
    type: Boolean,
    default: true
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const sizeClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  full: 'sm:max-w-4xl'
}

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    handleClose()
  }
}

// Handle escape key press
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.modelValue) {
    handleClose()
  }
}

// Add/remove event listeners
onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
/* Prevent body scroll when modal is open */
:deep(body.modal-open) {
  overflow: hidden;
}

/* Custom scrollbar for modal content */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>