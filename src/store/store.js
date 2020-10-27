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
    clickedPhoto: 0
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
    getPendingList (state) {
      return state.profile.pendingList
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
      state.friends[payload.user].isFriend = payload.value
    },
    setIsFriendButtonOnProfile (state, value) {
      state.friendProfile.isFriend = value
    },
    removeFromUserArrays (state, data) { // Remove data from arrays inside Profile user
      var userIndex = state.profile[data.array].findIndex(x => x.id === data.user)
      state.profile[data.array].splice(userIndex, 1)
    },
    addIntoUserArrays (state, data) { // add data into arrays inside Profile user
      state.profile[data.array].push(data.user)
    },
    removeFromFriendsArrays (state, data) { // Remove data from arrays inside Friend user
      var userIndex = state.friends[data.friendIndex][data.array].findIndex(x => x.id === state.profile.username)
      state.friends[data.friendIndex][data.array].splice(userIndex, 1)
    },
    addIntoFriendsArrays (state, data) { // add data into arrays inside Friend user
      state.friends[data.friendIndex][data.array].push(data.user)
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
      state.posts[index].likes.splice(userIndex)
    },
    toggleLikeBox (state, payload) {
      state.posts[payload.index].likeBox = payload.bool
    },
    setClickedPhoto (state, index) {
      state.clickedPhoto = index
    },
    addPhotoToAlbum (state, file) {
      state.profile.album.push(file)
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
    removeFromUserArrays: ({ commit }, data) => {
      commit('removeFromUserArrays', data)
    },
    addIntoUserArrays: ({ commit }, data) => {
      commit('addIntoUserArrays', data)
    },
    removeFromFriendsArrays: ({ commit }, data) => {
      commit('removeFromFriendsArrays', data)
    },
    addIntoFriendsArrays: ({ commit }, data) => {
      commit('addIntoFriendsArrays', data)
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
    }
  } // Actions End
}) // Vuex End
