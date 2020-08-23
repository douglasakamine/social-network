import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'Douglas Akamine',
    profileDescription: 'Brazilian, Work at Self-employed',
    post: [{
      id: '1',
      name: 'Douglas Teste',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel'
    }],
    friends: [{
      id: '1',
      name: 'Fulano da Silva',
      photo: 'Azula.png'
    },
    {
      id: '2',
      name: 'Ciclano',
      photo: 'Azula.png'
    },
    {
      id: '3',
      name: 'Fulano da Silva',
      photo: 'Azula.png'
    },
    {
      id: '4',
      name: 'Ciclano',
      photo: 'Azula.png'
    }]
  },
  getters: {
    getPost (state) {
      return state.post
    },
    getFriends (state) {
      return state.friends
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
