import { createRouter, createWebHistory } from 'vue-router'
import CVForm from '../views/CVForm.vue'
import ThankYou from '../views/ThankYou.vue'

const routes = [
  {
    path: '/',
    name: 'CVForm',
    component: CVForm
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: ThankYou
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router