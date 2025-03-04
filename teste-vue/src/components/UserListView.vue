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
const isDeleteModalOpen = ref(false) // Estado da modal de exclusão
const selectedUser = ref<{ id: number; name: string; email: string; phone?: string } | null>(null)
const userToDelete = ref<{ id: number; name: string } | null>(null) // Usuário a ser excluído
const router = useRouter()

const goToRegistration = () => {
  router.push('/register')
}

onMounted(() => {
  userStore.fetchUsers()
})

// Função para abrir a modal de edição
const openEditModal = (user: { id: number; name: string; email: string; phone?: string }) => {
  selectedUser.value = { ...user }
  isModalOpen.value = true
}

// Função para abrir a modal de exclusão
const openDeleteModal = (user: { id: number; name: string }) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

// Função para confirmar e excluir o usuário
const confirmDeleteUser = async (id: number) => {
  await userStore.deleteUser(id)
  isDeleteModalOpen.value = false
  userToDelete.value = null
}
// Função para salvar as edições
const saveEdit = async (updatedUser: { id: number; name: string; email: string; phone?: string }) => {
  await userStore.updateUser(updatedUser.id, updatedUser)
  isModalOpen.value = false 
}
</script>

<template>
  <div class="mt-4 p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-lg font-semibold text-gray-800">Lista de Usuários</h2>
      
      <BaseButton label="+ Adicionar Usuário" bgColor="bg-green-500" textColor="text-white" @click="goToRegistration" class="rounded hover:bg-green-600"/>
      
    </div>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 min-w-[600px]">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="border border-gray-300 px-4 py-2">Nome</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Telefone</th>
            <th class="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id" class="text-center">
            <td class="border border-gray-300 px-4 py-2">{{ user.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
            <td class="border border-gray-300 px-4 py-2">
              {{ user.phone ? formatPhone(user.phone) : 'Sem telefone' }}
            </td>
            <td class="border border-gray-300 px-4 py-2 flex justify-center gap-2 flex-wrap">
              <BaseButton label="Editar" bgColor="bg-yellow-500" textColor="text-white" @click="openEditModal(user)" class="rounded hover:bg-yellow-600"/>
              <BaseButton label="Excluir" bgColor="bg-red-500" textColor="text-white" @click="openDeleteModal(user)" class="rounded hover:bg-red-600"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!userStore.users.length" class="text-gray-500 text-center mt-3">Nenhum usuário cadastrado.</p>

    <!-- Modal de Edição -->
    <EditUserModal 
      :user="selectedUser" 
      :isOpen="isModalOpen" 
      @close="isModalOpen = false" 
      @save="saveEdit"
    />

    <!-- Modal de Exclusão -->
    <DeleteUserModal 
      :user="userToDelete" 
      :isOpen="isDeleteModalOpen" 
      @close="isDeleteModalOpen = false" 
      @confirm="confirmDeleteUser"
    />
  </div>
</template>
