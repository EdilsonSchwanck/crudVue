import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as { id: number; name: string; email: string; phone?: string }[],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/usuarios')
        if (!response.ok) throw new Error('Erro ao buscar usuários')

        this.users = await response.json()
      } catch (error) {
        alert(`Erro ao buscar usuarios tente novamente${error}`)
        console.error('Erro ao buscar usuários:', error)
      }
    },

    async addUser(user: { name: string; email: string; phone?: string }) {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
    
        if (!response.ok) throw new Error('Erro ao salvar usuário')
    
        const newUser = await response.json()
        this.users.push(newUser) 
        return newUser 
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error)
        return null 
      }
    },

    async deleteUser(id: number) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) throw new Error('Erro ao excluir usuário')

        this.users = this.users.filter(user => user.id !== id)
      } catch (error) {
        alert(`Erro ao excluir usuário:${error}`)
        console.error('Erro ao excluir usuário:', error)
      }
    },

    async updateUser(id: number, updatedUser: { name: string; email: string; phone?: string }) {
      try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        })
        if (!response.ok) throw new Error('Erro ao atualizar usuário')

        // Atualiza a lista localmente
        this.users = this.users.map(user => (user.id === id ? { ...user, ...updatedUser } : user))
      } catch (error) {
        alert(`Erro ao atualizar usuário:${error}`)
        console.error('Erro ao atualizar usuário:', error)
      }
    },
  },
})
