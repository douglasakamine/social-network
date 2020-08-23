import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'Douglas Akamine',
    profileDescription: 'Brazilian, Work at Self-employed',
    posts: [{
      id: '1',
      name: 'John Snow',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel'
    }],
    friends: [{
      id: '1',
      name: 'John Snow',
      photo: 'john.jpeg'
    },
    {
      id: '2',
      name: 'Luke Skywalker',
      photo: 'luke.jpeg'
    },
    {
      id: '3',
      name: 'Rick Grimes',
      photo: 'rick-grimes.jpg'
    },
    {
      id: '4',
      name: 'Batman',
      photo: 'batman.png'
    }]
  },
  getters: {
    getPost (state) {
      return state.posts
    },
    getFriends (state) {
      return state.friends
    }
  },
  mutations: {
    appendPost (state, postItem) {
      state.posts.push(postItem)
      console.log(state.posts)
    }
  },
  actions: {
    addPost: ({ commit }, postItem) => {
      commit('appendPost', postItem)
    }
  },
  modules: {
  }
})
