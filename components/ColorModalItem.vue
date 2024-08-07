<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  color: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['selectColor'])

function selectColor() {
  emit('selectColor', props.color)
}
</script>

<template>
  <button
    @click="selectColor"
    :class="
      selected
        ? 'background w-10 h-10 rounded-lg outline outline-2 outline-slate-400 outline-offset-2'
        : 'background w-10 h-10 rounded-lg'
    "
  ></button>
</template>

<style>
.background {
  background-color: v-bind('color');
}
</style>
