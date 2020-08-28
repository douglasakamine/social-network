import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'Douglas Akamine',
    profileDescription1: 'Brazilian, Web Developer',
    profileDescription2: 'Lives in Japan',
    countFriends: 0,
    posts: [{
      id: '1',
      name: 'Luke Skywalker',
      photo: 'luke.jpeg',
      date: '10 minutes ago',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel Lorem Ipsum conesectuatus',
      postImage: 'starwars.jpg'
    }, {
      id: '2',
      name: 'John Snow',
      photo: 'john.jpeg',
      date: '5 minutes ago',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel',
      postImage: 'game-thrones.jpg'
    }
    ],
    friends: [{
      id: '1',
      name: 'John Snow',
      photo: 'john.jpeg',
      isFriend: true
    },
    {
      id: '2',
      name: 'Luke Skywalker',
      photo: 'luke.jpeg',
      isFriend: false
    },
    {
      id: '3',
      name: 'Rick Grimes',
      photo: 'rick-grimes.jpg',
      isFriend: true
    },
    {
      id: '4',
      name: 'Batman',
      photo: 'batman.png',
      isFriend: false
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
