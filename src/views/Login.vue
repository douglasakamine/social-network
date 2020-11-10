<template>
<section class="login-page">
  <div class="login-header">
    <form class="login-form" @submit.prevent="userLogin">
      <input type="email" id="email-input" v-model="user.email" placeholder="Email...">
      <input type="password" id="password-input" v-model="user.password" placeholder="Password...">
      <button type="submit" id="login-button">Log In</button>
    </form>
  </div>
  <div class="title-box">
    <h1>Social Network</h1>
    <p>A Project made in Vue Js and Firebase</p>
    <p>Developed by Douglas Akamine</p>
    <p>Available at my <a href="https://github.com/douglasakamine" target="_blank">GitHub</a></p>
   </div>
<div class="sigin-form-box">
  <h2>Create an Account</h2>
<form class="sigin-form" @submit.prevent="submit">
    <input type="text" id="name-form" v-model="form.name" placeholder="Your Name">
    <input type="text" id="username-form" v-model="form.username" placeholder="Your username">
    <input type="email" id="email-form" v-model="form.email" placeholder="Email">
    <input type="password" id="password-form" v-model="form.password" placeholder="Password">
    <button type="submit" id="signin-button">Sign Up</button>
    <div v-show="success" class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  <strong>Account successfully created!</strong> Please log in.
</div>
</form>
</div>
</section>
</template>

<script>
import { auth, db } from '../main'
import Utils from '@/mixins/UtilsMixin'

export default {
  mixins: [Utils],
  data () {
    return {
      success: false,
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
            photo: 'https://firebasestorage.googleapis.com/v0/b/social-network-ed46e.appspot.com/o/default-user.jpg?alt=media&token=8adfe6a7-64a5-4f74-aa1f-ab9f34aa6ad9',
            backgroundImg: 'https://firebasestorage.googleapis.com/v0/b/social-network-ed46e.appspot.com/o/default-background.jpg?alt=media&token=e91f1bcb-9436-4b36-a9de-a4ec1b243b70',
            album: [],
            birth: '',
            city: '',
            country: '',
            description: '',
            work: ''
          })
          this.form.name = ''
          this.form.username = ''
          this.form.email = ''
          this.form.password = ''
          this.success = true
        }).catch(err => {
          alert(this.error = err.message)
        })
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
}
.login-header {
   background-color: #2620d8;
   padding-left: 80px;
   padding-right: 80px;
   height: 40px;
   display: flex;
   justify-content: flex-end;
}
.login-form {
  width: 400px;
  padding: 5px;
  text-align: center;
}
.login-form input {
  height: 20px;
  border-radius: 0.2em;
  outline: none;
  margin: 2px;
  border: none;
}
.login-form button {
    border: none;
    background-color: white;
    height: 20px;
    margin: 2px;
    padding: 2px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    border-radius: .2em;
    cursor: pointer;
}
.sigin-form-box {
  width: 300px;
  margin: 100px auto auto 900px;
  padding: 50px;
  background-color: white;
  border-radius: 1em;
}
.sigin-form {
  display: flex;
  flex-direction: column;
}
.sigin-form input {
  margin: 5px;
  height: 20px;
}
.title-box {
  width: 500px;
  float: left;
  margin: 100px auto auto 200px;
  text-align: center;
}
.title-box h1 {
  color: #2620d8;
  font-size: 60px;
  margin: 20px;
}
.title-box p {
  font-size: 20px;
  margin: 5px;
}
.sigin-form button {
    color: white;
    font-size: 15px;
    border: none;
    background-color: #008CBA;
    font-size: 16px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    margin: 4px;
    border-radius: .2em;
    cursor: pointer;
}
.alert {
  padding: 20px;
  background-color: green;
  color: white;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
