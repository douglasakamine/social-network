import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    friendProfile: {},
    posts: [],
    currentImageLink: '',
    friends: [],
    ads: [{
      id: '1',
      adsImage: 'advertising-word-block.jpg',
      adsDescription: 'Buy this product, Its Awesome!'
    }]
  }, // State End
  getters: {
    getPost (state) {
      var newPost = state.posts.sort((a, b) => new Date(b.date) - new Date(a.date))
      return newPost
    },
    getFriends (state) {
      return state.friends
    },
    getAds (state) {
      return state.ads
    },
    getProfileInfo (state) {
      return state.profile
    },
    getAlbumPhotos (state) {
      return state.profile.album
    },
    getFriendProfile (state) {
      console.log(state.friendProfile)
      return state.friendProfile
    }
  }, // Getters End
  mutations: {
    appendPost (state, postItem) {
      state.posts.push(postItem)
    },
    setProfileInfo (state, userData) {
      state.profile = userData
    },
    setCurrentImageLink (state, link) {
      state.currentImageLink = link
    },
    setInitialFeed (state, posts) {
      state.posts.push(posts)
    },
    setMyFeed (state, posts) {
      state.posts.push(posts)
    },
    clearPostState (state) {
      state.posts = []
    },
    updateProfileState (state, updateData) {
      state.profile[updateData.data] = updateData.value
    },
    setFriendsList (state, friend) {
      if (state.profile.friends.includes(friend.id)) {
        friend.isFriend = true
      }
      state.friends.push(friend)
    },
    setFriendProfile (state, userData) {
      state.friendProfile = userData
    }
  }, // Mutations End
  actions: {
    clearPostState: ({ commit }) => {
      commit('clearPostState')
    },
    addPost: ({ commit }, post) => {
      firebase.firestore().collection('posts').doc()
        .set(post)
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      commit('appendPost', post)
    },
    setProfileInfo: ({ commit }, userData) => {
      commit('setProfileInfo', userData)
    },
    setInitialFeed: ({ commit }, posts) => {
      commit('setInitialFeed', posts)
    },
    getMyFeed: ({ commit }, username) => {
      firebase.firestore().collection('posts').where('username', '==', username)
        .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit('setMyFeed', doc.data())
          })
        })
    },
    uploadFilePost ({ commit }, imageURL) {
      commit('setCurrentImageLink', imageURL)
    },
    updateProfileInfo: ({ commit }, updateData) => {
      commit('updateProfileState', updateData)
    },
    setFriendsList: ({ commit }, user) => {
      commit('setFriendsList', user)
    },
    setFriendProfile: ({ commit }, userData) => {
      console.log(userData)
      commit('setFriendProfile', userData)
    }
  } // Actions End
}) // Vuex End
