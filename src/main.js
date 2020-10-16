import Vue from 'vue'
import App from './App.vue'
import router from './router/routes'
import store from './store/store'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import { firebaseConfig } from '@/mixins/FirebaseSettings'

Vue.use(require('vue-moment'))

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const st = firebase.storage().ref()
export const auth = firebase.auth()
export const dbUsers = firebase.firestore().collection('users')
export const dbPosts = firebase.firestore().collection('posts')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
