import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titles: [
      { text: 'Taches', path: '/', icon: 'mdi-pencil' },
      { text: 'Ressources', path: '/ressource', icon: 'mdi-pencil' },
      { text: 'Perso', path: '/perso', icon: 'mdi-pencil' }
    ],
    dates: [],
    taches: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
