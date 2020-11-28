<template>
<section class="login-page">
  <div class="login-header">
    <form class="login-form" @submit.prevent="userLogin">
      <input type="email" id="email-input" v-model="user.email" placeholder="Email...">
      <input type="password" id="password-input" v-model="user.password" placeholder="Password...">
      <button type="submit" id="login-button">Log In</button>
    </form>
  </div>
  <div class="container-body">
<div class="forgot-form-box">
  <h2>Enter your account email</h2>
<form v-show="!success" class="forgot-form" @submit.prevent="submit">
    <input type="email" id="email-form" v-model="form.email" placeholder="Email">
    <button type="submit" id="send-button">Send</button>
</form>
<div v-show="success" class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
  <strong>An email was sent to you, please follow the instructions</strong>
</div>
</div>
</div>
</section>
</template>

<script>
import { auth } from '../main'

export default {
  data () {
    return {
      success: false,
      user: {
        email: '',
        password: ''
      },
      form: {
        email: ''
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
      var emailAddress = this.form.email

      auth.sendPasswordResetEmail(emailAddress).then(() => {
        this.success = true
      }).catch(function (error) {
        alert(error)
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
.container-body {
    display: flex;
    justify-content: center;
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
.forgot-form-box {
  width: 300px;
  margin: 100px auto auto auto;
  padding: 50px;
  background-color: white;
  border-radius: 1em;
}
.forgot-form {
  display: flex;
  flex-direction: column;
}
.forgot-form input {
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
.forgot-form button {
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
.forgot-password {
  text-align: center;
  font-weight: bold;
}
.forgot-password a {
  text-decoration: none;
}
</style>
