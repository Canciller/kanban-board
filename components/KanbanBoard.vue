<script setup lang="ts">
import KanbanColumn from './KanbanColumn.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { useBoard } from '../hooks/useBoard'
import PlusIcon from './icons/PlusIcon.vue'

const { board, editCard, addCard, editColumn, addColumn } = useBoard()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="p-4">
      <h1 class="text-xl font-bold">
        {{ board.title }}
      </h1>
    </div>

    <div class="relative flex-1">
      <div class="bg-blue-200 absolute inset-0 overflow-auto p-4 flex gap-4">
        <VueDraggableNext
          :list="board.columns"
          tag="div"
          class="flex gap-4 items-start"
          group="columns"
        >
          <KanbanColumn
            @edit-card="editCard"
            @add-card="addCard"
            @edit-column="editColumn"
            v-for="column in board.columns"
            :key="column.id"
            :column="column"
          />
        </VueDraggableNext>

        <div>
          <button
            @click="addColumn"
            class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 w-full p-2 rounded-lg transition-all min-w-64"
          >
            <PlusIcon />
            <span class="text-gray-600">Add a column</span>
          </button>
        </div>
      </div>
    </div>

    <!-- <div class="flex-1 absolute overflow-auto right-0 bottom-0 h-[500px] bg-white/30">
      <pre
        >{{ board }}
    </pre
      >
    </div> -->
  </div>
</template>
