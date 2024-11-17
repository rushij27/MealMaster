// src/views/MealPlanner/components/ShoppingListModal.vue
<template>
  <app-modal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Shopping List"
    size="lg"
  >
    <div class="space-y-6">
      <!-- Actions -->
      <div class="flex justify-between items-center">
        <div class="flex space-x-2">
          <button
            @click="toggleAllItems"
            class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            {{ allChecked ? 'Uncheck All' : 'Check All' }}
          </button>
          <button
            @click="removeCheckedItems"
            class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md"
            :disabled="!hasCheckedItems"
          >
            Remove Checked
          </button>
        </div>
        <div class="flex space-x-2">
          <button
            @click="printList"
            class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <font-awesome-icon icon="print" class="mr-1" />
            Print
          </button>
          <button
            @click="exportList"
            class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <font-awesome-icon icon="download" class="mr-1" />
            Export
          </button>
        </div>
      </div>

      <!-- Shopping List -->
      <div class="space-y-6">
        <div
          v-for="(items, category) in groupedItems"
          :key="category"
          class="space-y-2"
        >
          <h3 class="font-medium text-gray-900">{{ category }}</h3>
          <div class="space-y-2">
            <div
              v-for="item in items"
              :key="item.id"
              class="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
            >
              <input
                type="checkbox"
                v-model="item.checked"
                class="rounded text-indigo-600 focus:ring-indigo-500"
              >
              <span
                :class="{ 'line-through text-gray-400': item.checked }"
                class="flex-grow"
              >
                {{ item.name }}
              </span>
              <span class="text-sm text-gray-500">
                {{ item.amount }} {{ item.unit }}
              </span>
              <button
                @click="removeItem(item)"
                class="text-gray-400 hover:text-gray-500"
              >
                <font-awesome-icon icon="times" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!hasItems"
        class="text-center py-8"
      >
        <font-awesome-icon
          icon="shopping-basket"
          class="text-4xl text-gray-400 mb-2"
        />
        <p class="text-gray-500">Your shopping list is empty</p>
      </div>
    </div>

    <!-- Modal Footer -->
    <template #footer>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">
          {{ totalItems }} items
        </span>
        <div class="flex space-x-3">
          <button
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Close
          </button>
          <button
            @click="saveList"
            class="px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
          >
            Save List
          </button>
        </div>
      </div>
    </template>
  </app-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppModal from '@/components/common/AppModal.vue'

const props = defineProps({
  modelValue: Boolean,
  shoppingList: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'save'])

// Local copy of shopping list with checked state
const items = ref(props.shoppingList.map(item => ({
  ...item,
  checked: false
})))

// Computed
const groupedItems = computed(() => {
  return items.value.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})
})

const hasItems = computed(() => items.value.length > 0)
const totalItems = computed(() => items.value.length)
const hasCheckedItems = computed(() => items.value.some(item => item.checked))
const allChecked = computed(() => items.value.every(item => item.checked))

// Methods
const toggleAllItems = () => {
  const newState = !allChecked.value
  items.value.forEach(item => item.checked = newState)
}

const removeCheckedItems = () => {
  items.value = items.value.filter(item => !item.checked)
}

const removeItem = (itemToRemove) => {
  items.value = items.value.filter(item => item !== itemToRemove)
}

const saveList = () => {
  emit('save', items.value)
  emit('update:modelValue', false)
}

const printList = () => {
  window.print()
}

const exportList = () => {
  const data = items.value.map(item => ({
    category: item.category,
    name: item.name,
    amount: item.amount,
    unit: item.unit
  }))

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'shopping-list.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
}
</style>