<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import BaseButton from './button_components/BaseButton.vue'

const text = ref('');
const fullText = 'Bem-vindo ao sistema';
let index = 0;
let isDeleting = false;
const router = useRouter();

const goToRegistration = () => {
  router.push('/register') 
}

const goToEditUser = () => {
  router.push('/users')
}

onMounted(() => {
  setInterval(() => {
    if (!isDeleting) {
      if (index < fullText.length) {
        text.value += fullText[index];
        index++;
      } else {
        isDeleting = true;
      }
    } else {
      if (index > 0) {
        text.value = text.value.slice(0, -1);
        index--;
      } else {
        isDeleting = false;
      }
    }
  }, 150);
});
</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-4 sm:p-6">
    <!-- Texto animado -->
    <div class="text-gray-900 text-3xl sm:text-4xl md:text-6xl font-extrabold text-center mb-6 sm:mb-8">
      {{ text }}<span class="animate-blink text-indigo-600">|</span>
    </div>

    <!-- Caixa de instruções -->
    <div class="w-full max-w-sm sm:max-w-md bg-white shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 border border-gray-200">
      
      <!-- Texto de instrução -->
      <h4 class="text-gray-800 text-base sm:text-lg md:text-xl font-semibold text-center">
        Use os botões abaixo para cadastrar ou editar um usuário
      </h4>

      <!-- Botões -->
      <div class="flex flex-col sm:flex-row justify-center gap-4 w-full">
        <BaseButton label="Cadastrar Usuário" bgColor="bg-blue-500" textColor="text-white" @click="goToRegistration" class="w-full sm:w-auto rounded hover:bg-blue-600 py-2 px-4" />
        <BaseButton label="Listar Usuário" bgColor="bg-green-500" textColor="text-white" @click="goToEditUser" class="w-full sm:w-auto rounded hover:bg-green-600 py-2 px-4" />
      </div>
    </div>
  </div>
</template>

<style>
@keyframes blink {
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 0.7s infinite;
}
</style>
