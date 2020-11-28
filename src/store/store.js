import Vue from 'vue'
import Vuex from 'vuex'
import { dbPosts } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profile: {},
    friendProfile: {},
    posts: [],
    currentImageLink: '',
    friends: [],
    ads: [],
    editProfileInfoButton: false,
    buttonAlbum: false,
    clickedPhoto: 0,
    chat: [],
    currentChat: 0,
    notification: 0
  }, // State End
  getters: {
    getFeed (state) { // Get initial Feed
      var newPost = state.posts.sort((a, b) => new Date(b.date) - new Date(a.date))
      return newPost
    },
    getEditProfileInfoButton (state) { // Return Edit Profile Button (Toggle True or false)
      return state.editProfileInfoButton
    },
    getButtonAlbum (state) { // Return Edit Profile Button (Toggle True or false)
      return state.buttonAlbum
    },
    getChat (state) { // Return the current chat
      return state.chat
    },
    getNotification (state) {
      return state.notification
    },
    getCurrentChat (state) {
      return state.currentChat
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
    getFriendProfile (state) {
      return state.friendProfile
    },
    getClickedPhoto (state) {
      return state.clickedPhoto
    }
  }, // Getters End
  mutations: {
    appendPost (state, postItem) {
      state.posts.push(postItem)
    },
    removePost (state, index) {
      state.posts.splice(index, 1)
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
    setUsersList (state, friend) {
      state.friends.push(friend)
    },
    setFriendProfile (state, userData) {
      state.friendProfile = userData
    },
    setIsFriendButton (state, payload) {
      state.friends[payload.user].isFriend = payload.value
    },
    setIsFriendButtonOnProfile (state, value) {
      state.friendProfile.isFriend = value
    },
    setEditProfileInfoButton (state, bool) {
      state.editProfileInfoButton = bool
    },
    setButtonAlbum (state, bool) {
      state.buttonAlbum = bool
    },
    setAdsToState (state, ads) {
      state.ads.push(ads)
    },
    updateLikes (state, index) {
      state.posts[index].likes.push(state.profile.username)
    },
    removeLikes (state, index) {
      var userIndex = state.posts[index].likes.findIndex(x => x.id === state.profile.username)
      state.posts[index].likes.splice(userIndex, 1)
    },
    toggleLikeBox (state, payload) {
      state.posts[payload.index].likeBox = payload.bool
    },
    setClickedPhoto (state, index) {
      state.clickedPhoto = index
    },
    addPhotoToAlbum (state, file) {
      state.profile.album.push(file)
    },
    setChat (state, chat) {
      state.chat = chat
    },
    addIntoArray (state, payload) {
      state.friends[payload.array] = payload.data
    },
    setDeleteButtonOnPhotos (state, payload) {
      Vue.set(state.profile.deleteHover, payload.photoIndex, payload.value)
    },
    setCurrentChat (state, index) {
      state.currentChat = index
    },
    setNotification (state, num) {
      state.notification = state.notification + num
    }
  }, // Mutations End
  actions: {
    addPost: ({ commit }, post) => {
      dbPosts.add(post).then(function (docRef) {
        post.id = docRef.id
        commit('appendPost', post)
      })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    setProfileInfo: ({ commit }, userData) => { // Initial profile informations
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
    setUsersList: ({ commit }, user) => {
      commit('setUsersList', user)
    },
    setFriendProfile: ({ commit }, userData) => {
      commit('setFriendProfile', userData)
    },
    setIsFriendButton: ({ commit }, payload) => {
      commit('setIsFriendButton', payload)
    },
    setEditProfileInfoButton: ({ commit }, bool) => {
      commit('setEditProfileInfoButton', bool)
    },
    setButtonAlbum: ({ commit }, bool) => {
      commit('setButtonAlbum', bool)
    },
    setAdsToState: ({ commit }, ads) => {
      commit('setAdsToState', ads)
    },
    updateLikes: ({ commit }, index) => {
      commit('updateLikes', index)
    },
    removeLikes: ({ commit }, index) => {
      commit('removeLikes', index)
    },
    toggleLikeBox: ({ commit }, payload) => {
      commit('toggleLikeBox', payload)
    },
    setClickedPhoto: ({ commit }, index) => {
      commit('setClickedPhoto', index)
    },
    addPhotoToAlbum: ({ commit }, file) => {
      commit('addPhotoToAlbum', file)
    },
    removePost: ({ commit }, index) => {
      commit('removePost', index)
    },
    setIsFriendButtonOnProfile: ({ commit }, value) => {
      commit('setIsFriendButtonOnProfile', value)
    },
    setChat: ({ commit }, chat) => {
      commit('setChat', chat)
    },
    addIntoArray: ({ commit }, payload) => {
      commit('addIntoArray', payload)
    },
    setDeleteButtonOnPhotos: ({ commit }, payload) => {
      commit('setDeleteButtonOnPhotos', payload)
    },
    setCurrentChat: ({ commit }, index) => {
      commit('setCurrentChat', index)
    },
    setNotification: ({ commit }, num) => {
      commit('setNotification', num)
    }
  } // Actions End
}) // Vuex End
