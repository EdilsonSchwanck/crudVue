<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/userStores'
import { formatPhone } from '../utils/phoneMask' 
import EditUserModal from './ModalEditView.vue'
import DeleteUserModal from './ModalDelete.vue' 
import { useRouter } from 'vue-router'
import BaseButton from './button_components/BaseButton.vue'

const userStore = useUserStore()
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedUser = ref<{ id: number; name: string; email: string; phone?: string } | null>(null)
const userToDelete = ref<{ id: number; name: string } | null>(null)
const router = useRouter()

const goToRegistration = () => router.push('/register')

onMounted(() => userStore.fetchUsers())

const openEditModal = (user: { id: number; name: string; email: string; phone?: string }) => {
  selectedUser.value = { ...user }
  isModalOpen.value = true
}

const openDeleteModal = (user: { id: number; name: string }) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const confirmDeleteUser = async (id: number) => {
  await userStore.deleteUser(id)
  isDeleteModalOpen.value = false
  userToDelete.value = null
}

const saveEdit = async (updatedUser: { id: number; name: string; email: string; phone?: string }) => {
  await userStore.updateUser(updatedUser.id, updatedUser)
  isModalOpen.value = false 
}
</script>

<template>
  <div class="mt-4 p-2 sm:p-4 bg-white shadow-md rounded-lg w-full max-w-4xl mx-auto">
    
    <!-- Cabeçalho -->
    <div class="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
      <h2 class="text-lg sm:text-xl font-semibold text-gray-800">Lista de Usuários</h2>
      <BaseButton 
        label="+ Adicionar Usuário" 
        bgColor="bg-green-500" 
        textColor="text-white" 
        @click="goToRegistration" 
        class="rounded hover:bg-green-600 text-sm sm:text-base w-full sm:w-auto"
      />
    </div>

    <!-- Tabela responsiva -->
    <div class="overflow-x-auto">
      <table class="w-full min-w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">Nome</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">Email</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">Telefone</th>
            <th class="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id" class="text-center text-sm sm:text-base">
            <td class="border border-gray-300 px-2 sm:px-4 py-2">{{ user.name }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2">
              {{ user.phone ? formatPhone(user.phone) : 'Sem telefone' }}
            </td>
            <td class="border border-gray-300 px-2 sm:px-4 py-2 flex justify-center gap-2 flex-wrap">
              <BaseButton 
                label="Editar" 
                bgColor="bg-yellow-500" 
                textColor="text-white" 
                @click="openEditModal(user)" 
                class="rounded hover:bg-yellow-600 text-sm sm:text-base w-full sm:w-auto"
              />
              <BaseButton 
                label="Excluir" 
                bgColor="bg-red-500" 
                textColor="text-white" 
                @click="openDeleteModal(user)" 
                class="rounded hover:bg-red-600 text-sm sm:text-base w-full sm:w-auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mensagem quando não há usuários -->
    <p v-if="!userStore.users.length" class="text-gray-500 text-center mt-3">Nenhum usuário cadastrado.</p>

    <!-- Modais -->
    <EditUserModal :user="selectedUser" :isOpen="isModalOpen" @close="isModalOpen = false" @save="saveEdit" />
    <DeleteUserModal :user="userToDelete" :isOpen="isDeleteModalOpen" @close="isDeleteModalOpen = false" @confirm="confirmDeleteUser" />
  </div>
</template>

