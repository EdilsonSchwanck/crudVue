<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/userStores'
import { formatPhone, unmaskPhone } from '../utils/phoneMask' 
import { useRouter } from 'vue-router'
import BaseButton from './button_components/BaseButton.vue'

const userStore = useUserStore()
const router = useRouter()

const goToHome = () => router.push('/')

const name = ref('')
const email = ref('')
const phone = ref('')
const emailError = ref('')

// Observa mudanças no telefone e aplica a máscara
watch(phone, (newValue) => {
  phone.value = formatPhone(newValue)
})

// Função para validar email
const validateEmail = () => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = regex.test(email.value) ? '' : 'Email inválido'
}

// Função para submeter o formulário
const submitForm = async () => {
  validateEmail()
  if (emailError.value) return

  const phoneUnmasked = unmaskPhone(phone.value)

  try {
    const newUser = await userStore.addUser({
      name: name.value,
      email: email.value,
      phone: phoneUnmasked,
    })

    if (newUser) {
      alert('✅ Usuário cadastrado com sucesso!')
      name.value = ''
      email.value = ''
      phone.value = ''
      router.push('/users')
    } else {
      alert('Erro ao cadastrar usuário. Tente novamente.')
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor! Verifique sua conexão.')
    console.error('Erro ao cadastrar usuário:', error)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div class="w-full max-w-md sm:max-w-lg bg-white p-6 rounded-2xl shadow-lg">
      <h2 class="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6">Cadastro de Usuário</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Nome -->
        <div>
          <label for="name" class="block text-sm sm:text-base font-medium text-gray-700">Nome</label>
          <input 
            v-model="name" 
            id="name" 
            type="text" 
            required 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm sm:text-base font-medium text-gray-700">Email</label>
          <input 
            v-model="email" 
            id="email" 
            type="email" 
            required 
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
          <span v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</span>
        </div>

        <!-- Telefone -->
        <div>
          <label for="phone" class="block text-sm sm:text-base font-medium text-gray-700">Telefone (opcional)</label>
          <input 
            v-model="phone" 
            id="phone" 
            type="tel" 
            maxlength="15"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
          />
        </div>

        <!-- Botões -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 w-full">
          <BaseButton 
            label="Salvar" 
            bgColor="bg-blue-600" 
            textColor="text-white" 
            type="submit" 
            class="rounded hover:bg-blue-700 w-full sm:w-auto py-2"
          />
          <BaseButton 
            label="Cancelar" 
            bgColor="bg-red-500" 
            textColor="text-white" 
            @click="goToHome" 
            class="rounded hover:bg-red-600 w-full sm:w-auto py-2"
          />
        </div>
      </form>
    </div>
  </div>
</template>
