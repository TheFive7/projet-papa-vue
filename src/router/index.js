import Vue from 'vue'
import VueRouter from 'vue-router'
import RessourceView from '@/views/RessourceView'
import TacheView from '@/views/TacheView'
import PersoView from '@/views/PersoView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ressource',
    name: 'ressource',
    component: RessourceView
  },
  {
    path: '/',
    name: 'tache',
    component: TacheView
  },
  {
    path: '/perso',
    name: 'perso',
    component: PersoView
  }
]

const router = new VueRouter({
  routes
})

export default router
