<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ColorModalItem from './ColorModalItem.vue'
import { Teleport } from 'vue'

// Define props
const props = defineProps({
  open: {
    type: Boolean,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

// Define emits
const emit = defineEmits(['selectColor'])

// Array of available colors
const colors = ['red', 'green', 'blue', 'orange']

// Emit the selected color
function selectColor(selectedColor: string) {
  emit('selectColor', selectedColor)
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.open" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-4">
        <h1 class="text-lg font-bold mb-2">Pick a color</h1>

        <div class="flex gap-2">
          <ColorModalItem
            v-for="c in colors"
            :key="c"
            :color="c"
            :selected="c === props.color"
            @select-color="selectColor"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Add any necessary styles here */
</style>
