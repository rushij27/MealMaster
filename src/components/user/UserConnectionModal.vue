<template>
  <AppModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="Connect to Meal Planner"
    size="md"
  >
    <div class="space-y-6">
      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              v-model="formData.username"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </form>

      <!-- Error Message -->
      <div v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </div>
    </div>

    <!-- Modal Footer -->
    <template #footer>
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleSubmit"
          :disabled="loading"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md disabled:opacity-50"
        >
          <span v-if="loading">Connecting...</span>
          <span v-else>Connect</span>
        </button>
      </div>
    </template>
  </AppModal>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import AppModal from '@/components/common/AppModal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'connected'])

// Store
const userStore = useUserStore()
const { loading } = storeToRefs(userStore)

// Local state
const error = ref('')
const formData = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: ''
})

// Methods
const handleSubmit = async () => {
  error.value = ''
  
  try {
    await userStore.connectUser(formData.value)
    emit('connected', formData.value.username)
    closeModal()
  } catch (err) {
    error.value = err.message || 'Failed to connect. Please try again.'
  }
}

const closeModal = () => {
  emit('update:modelValue', false)
  formData.value = {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  }
  error.value = ''
}
</script>