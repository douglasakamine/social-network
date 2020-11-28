import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/store'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { firebaseConfig } from '@/mixins/FirebaseSettings'
import linkify from 'vue-linkify'
import Nl2br from 'vue-nl2br'

Vue.component('nl2br', Nl2br)

Vue.directive('linkified', linkify)

Vue.use(require('vue-moment'))

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const st = firebase.storage().ref()
export const auth = firebase.auth()
export const dbUsers = firebase.firestore().collection('users')
export const dbPosts = firebase.firestore().collection('posts')
export const dbChats = firebase.firestore().collection('chats')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
