import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/unit:unitNumber',
      name:'unit',
      component: () => import('../views/UnitView.vue')
    }
    
  ]
})

export default router