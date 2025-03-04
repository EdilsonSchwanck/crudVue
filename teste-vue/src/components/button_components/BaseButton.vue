<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  label?: string 
  bgColor?: string 
  textColor?: string 
}>()

const emit = defineEmits(['click']) // Evento de clique


const buttonClasses = computed(() => [
  'px-4 py-2 rounded-lg shadow-md transition duration-200',
  props.bgColor || 'bg-gray-300', 
  props.textColor || 'text-black' 
])
</script>

<template>
  <button 
    @click="emit('click')" 
    :class="buttonClasses"
  >
    {{ label }}
    <slot></slot> 
  </button>
</template>