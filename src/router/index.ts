import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import StudyCards from '@/views/StudyCards.vue'
import TutorView from '@/views/TutorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cards',
      name: 'study-cards',
      component: StudyCards
    },
    {
      path: '/tutor',
      name: 'tutor-view',
      component: TutorView
    }
  ]
})

export default router
