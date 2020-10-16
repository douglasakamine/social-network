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
    getFeed (state) { // Get initial Feed
      var newPost = state.posts.sort((a, b) => new Date(b.date) - new Date(a.date))
      return newPost
    },
    getFriendsPosts (state) { // Get individual posts of friends page
      var posts = []
      state.posts.forEach(post => {
        if (post.username === state.friendProfile.username) {
          posts.push(post)
        }
      })
      return posts
    },
    getMyPosts (state) { // Get my individual posts of profile page
      var posts = []
      state.posts.forEach(post => {
        if (post.username === state.profile.username) {
          posts.push(post)
        }
      })
      return posts
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
      return state.friendProfile
    },
    getPendingList (state) {
      return state.profile.pendingList
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
    setFeed (state, posts) {
      state.posts.push(posts)
    },
    updateProfileState (state, updateData) {
      state.profile[updateData.data] = updateData.value
    },
    setFriendsList (state, friend) {
      if (state.profile.friends.includes(friend.id)) {
        friend.isFriend = 'friend'
      } else if (state.profile.pendingList.includes(friend.id) ||
      friend.pendingList.includes(state.profile.username)) {
        friend.isFriend = 'pending'
      }
      state.friends.push(friend)
    },
    setFriendProfile (state, userData) {
      state.friendProfile = userData
    },
    setIsFriendButton (state, payload) {
      console.log(payload)
      state.friends[payload.user].isFriend = payload.value
    },
    removeFromPendingList (state, index) {
      state.profile.pendingList.splice(index)
    }
  }, // Mutations End
  actions: {
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
      console.log('SET PROFILE INFO')
      commit('setProfileInfo', userData)
    },
    setFeed: ({ commit }, posts) => {
      commit('setFeed', posts)
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
      commit('setFriendProfile', userData)
    },
    setIsFriendButton: ({ commit }, payload) => {
      commit('setIsFriendButton', payload)
    },
    removeFromPendingList: ({ commit }, index) => {
      commit('removeFromPendingList', index)
    }
  } // Actions End
}) // Vuex End
