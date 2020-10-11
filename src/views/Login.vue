<template>
<section class="login-page">
<form class="login-form" @submit.prevent="userLogin">
    <input type="email" id="email-input" v-model="user.email">
    <input type="password" id="password-input" v-model="user.password">
    <button type="submit" id="login-button">Log In</button>
</form>
<hr>
<form class="sigin-form" @submit.prevent="submit">
    <input type="text" id="name-form" v-model="form.name" placeholder="Your Name">
    <input type="text" id="username-form" v-model="form.username" placeholder="Your username">
    <input type="email" id="email-form" v-model="form.email" placeholder="Email">
    <input type="password" id="password-form" v-model="form.password" placeholder="Password">
    <button type="submit" id="signin-button">Sign Up</button>
</form>
</section>
</template>

<script>
import { auth, db } from '../main'
import Utils from '@/mixins/UtilsMixin'

export default {
  mixins: [Utils],
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      form: {
        name: '',
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    userLogin () {
      auth.signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.replace({ name: 'Home' })
        })
        .catch((error) => {
          alert(error.message)
        })
    },
    submit () {
      auth.createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(result => {
          result.user.updateProfile({
            displayName: this.form.username
          })
          db.collection('/users').doc(this.form.username).set({
            name: this.form.name,
            username: this.form.username,
            email: this.form.email,
            photo: 'https://firebasestorage.googleapis.com/v0/b/social-network-ed46e.appspot.com/o/douglas.jpeg?alt=media&token=b389217d-5bf4-4a17-b5b6-c097db01ac52',
            countFriends: 0
          })
        }).catch(err => {
          this.error = err.message
        })
    }
  }
}
</script>

<style scoped>

</style>
