<template>
  <div class="meal-planner">
    <!-- User Connection Check -->
    <div v-if="!isUserConnected" class="text-center py-12 bg-white rounded-lg shadow-sm">
      <div class="max-w-md mx-auto p-6">
        <font-awesome-icon
          icon="user-circle"
          class="text-6xl text-indigo-600 mb-4"
        />
        <h2 class="text-2xl font-bold text-gray-900 mb-4">
          Connect to Meal Planner
        </h2>
        <p class="text-gray-600 mb-6">
          To use the meal planner features and save your meal plans, you need to connect your account first.
        </p>
        <button
          @click="openConnectionModal"
          class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <font-awesome-icon icon="plug" class="mr-2" />
          Connect Now
        </button>
      </div>
    </div>

    <!-- Main Meal Planner Content -->
    <div v-else>
      <!-- Your existing meal planner content -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <app-loader size="lg" />
      </div>
      
      <div v-else>
        <!-- Your existing meal planner template content -->
      </div>
    </div>

     <!-- Connection Modal -->
     <Teleport to="body">
      <UserConnectionModal
        v-if="showConnectionModal"
        :show="showConnectionModal"
        @update:show="showConnectionModal = $event"
        @connected="handleUserConnected"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/user'
import { useMealPlanStore } from '../../store/mealPlan'
import UserConnectionModal from '@/components/user/UserConnectionModal.vue'
import AppLoader from '@/components/common/AppLoader.vue'

const userStore = useUserStore()
const mealPlanStore = useMealPlanStore()
const { isConnected } = storeToRefs(userStore)
const { loading } = storeToRefs(mealPlanStore)
const showConnectionModal = ref(false);

const isUserConnected = computed(() => isConnected.value)

const handleUserConnected = async (username) => {
  showConnectionModal.value = false
  console.log('User connected:', username)
  try {
    await mealPlanStore.fetchWeekPlan(new Date())
  } catch (error) {
    console.error('Error fetching meal plan:', error)
  }
}

const openConnectionModal = () => {
  showConnectionModal.value = true
}

// Check connection status on mount
onMounted(() => {
  if (isConnected.value) {
    handleUserConnected(userStore.username)
  }
})
</script>
