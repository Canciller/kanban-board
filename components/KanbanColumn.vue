<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next'
import { defineProps, defineEmits, ref, onMounted } from 'vue'
import KanbanCard from './KanbanCard.vue'
import PlusIcon from './icons/PlusIcon.vue'
import type { ColumnType } from '../hooks/useBoard'

const props = defineProps<{
  column: ColumnType
}>()

const emit = defineEmits(['addCard', 'editCard', 'editColumn'])

function editCard(
  cardId: string,
  newProps: {
    description?: string
    color?: string
  }
) {
  emit('editCard', { id: cardId, columnId: props.column.id }, newProps)
}

function addCard() {
  emit('addCard', props.column.id)
}

function editColumnTitle(e: Event) {
  emit(
    'editColumn',
    {
      id: props.column.id
    },
    {
      title: (e.target as HTMLInputElement).value
    }
  )
}

function selectAllTitleText(e: Event) {
  ;(e.target as HTMLInputElement).select()
}

const inputEl = ref()

onMounted(() => {
  if (props.column.autoFocus) {
    inputEl.value.focus()
  }
})
</script>

<template>
  <div class="bg-slate-100 rounded-lg min-w-64 cursor-pointer overflow-auto max-h-full">
    <div class="p-4">
      <input
        ref="inputEl"
        @focus="selectAllTitleText"
        class="bg-transparent focus:outline-none placeholder-gray-600 font-semibold"
        placeholder="Enter column title"
        :value="props.column.title"
        @input="editColumnTitle"
      />
    </div>

    <VueDraggableNext
      :list="props.column.cards"
      tag="div"
      class="flex flex-col gap-2 px-4"
      group="cards"
      :fallbackOnBody="true"
      :forceFallback="true"
    >
      <KanbanCard
        v-for="card in props.column.cards"
        :key="card.id"
        :card="card"
        @edit-card="editCard"
      />
    </VueDraggableNext>

    <div class="p-4">
      <button
        @click="addCard"
        class="flex items-center gap-2 hover:bg-slate-300 w-full p-2 rounded-lg transition-all"
      >
        <PlusIcon />
        <span class="text-gray-600">Add a card</span>
      </button>
    </div>
  </div>
</template>
