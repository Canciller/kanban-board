<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import ColorModal from './ColorModal.vue'
import type { CardType } from '../hooks/useBoard'

// Define props
const props = defineProps<{
  card: CardType
}>()

// Define emits
const emit = defineEmits(['editCard'])

const open = ref(false)

// Edit card function
function editCard(newProps: { description?: string; color?: string }) {
  emit('editCard', props.card.id, newProps)
}

// Select color function
function selectColor(color: string) {
  editCard({ color })
  open.value = false
}

function updateDescription(e: Event) {
  editCard({
    description: (e.target as HTMLInputElement).value
  })
}

const inputEl = ref()

onMounted(() => {
  if (props.card.autoFocus) {
    inputEl.value.focus()
  }
})
</script>

<template>
  <div
    class="cursor-pointer bg-slate-200 hover:bg-slate-300 p-4 rounded-lg flex flex-col gap-2 select-none"
  >
    <button @click="open = true" v-if="props.card.color" class="tag w-12 h-3 rounded-full" />

    <input
      ref="inputEl"
      placeholder="Enter description"
      :value="props.card.description"
      @input="updateDescription"
      class="bg-transparent focus:outline-none placeholder-gray-600 text-sm"
    />

    <ColorModal :open="open" :color="props.card.color" @select-color="selectColor" />
  </div>
</template>

<style scoped>
.tag {
  background-color: v-bind('props.card.color');
}
</style>
