<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import BaseButton from './button_components/BaseButton.vue'

const props = defineProps<{
  user: { id: number; name: string } | null
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'confirm'])

// Computed property para evitar erro de props não utilizadas
const userName = computed(() => props.user?.name || '')
</script>

<template>
  <transition name="fade">
    <div 
      v-if="props.isOpen" 
      class="fixed inset-0 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-300 relative">
        
        <!-- Ícone de alerta -->
        <div class="flex justify-center mb-3">
          <svg class="w-12 h-12 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        </div>

        <h2 class="text-2xl font-semibold text-center text-gray-800">Confirmar Exclusão</h2>

        <p class="text-center text-gray-600 mt-3">
          Tem certeza que deseja excluir o usuário 
          <span class="font-bold text-gray-900">{{ userName }}</span>?
        </p>

        <!-- Botões -->
        <div class="flex justify-center gap-4 mt-6">

        <BaseButton label="CANCELAR" bgColor="bg-gray-300" textColor="text-gray-800" @click="emit('close')"  class="rounded hover:bg-gray-400" />
        <BaseButton label="SIM" bgColor="bg-red-600" textColor="text-white" @click="emit('confirm', props.user?.id)"  class="rounded hover:bg-red-700 px-5 py-2" />
       
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
