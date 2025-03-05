<script setup lang="ts">
import { defineEmits, watch } from 'vue'
import { formatPhone, unmaskPhone } from '../utils/phoneMask' 
import BaseButton from './button_components/BaseButton.vue'

const props = defineProps<{
  user: { id: number; name: string; email: string; phone?: string } | null
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'save'])

// Observa mudanças no telefone e aplica a máscara em tempo real
watch(() => props.user?.phone, (newValue) => {
  if (props.user) {
    props.user.phone = formatPhone(newValue || '') // Aplica a máscara
  }
})

// Função para salvar as edições
const saveEdit = () => {
  if (props.user) {
    const updatedUser = { ...props.user, phone: unmaskPhone(props.user.phone || '') } // Remove a máscara antes de salvar
    emit('save', updatedUser) // Emite o evento para o componente pai
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative">
        <h2 class="text-lg font-semibold mb-4">Editar Usuário</h2>
        
        <label class="block text-sm font-medium text-gray-700">Nome</label>
        <input v-model="user!.name" type="text" class="w-full p-2 border rounded mb-3">

        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="user!.email" type="email" class="w-full p-2 border rounded mb-3">

        <label class="block text-sm font-medium text-gray-700">Telefone</label>
        <input v-model="user!.phone" type="text" class="w-full p-2 border rounded mb-3">

        <div class="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <BaseButton label="Cancelar" bgColor="bg-gray-400" textColor="text-white" @click="emit('close')" class="w-full sm:w-auto rounded" />
          <BaseButton label="Salvar" bgColor="bg-blue-500" textColor="text-white" @click="saveEdit" class="w-full sm:w-auto rounded hover:bg-blue-600" />
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
