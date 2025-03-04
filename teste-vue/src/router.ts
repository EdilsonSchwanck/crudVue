import { createRouter, createWebHistory } from 'vue-router'

import RegisterView from './components/RegisterView.vue'
import UserListView from './components/UserListView.vue'
import HomeView from './components/HomeView.vue'


const routes = [
  { path: '/', name: 'home', component: HomeView},
  { path: '/register', component: RegisterView },
  { path: '/users', component: UserListView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router