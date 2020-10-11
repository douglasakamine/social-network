<template>
  <header id="header">
    <nav class="headerNav">
     <div id="logo"><h1>Social Network</h1></div>
     <input id="search" type="search" placeholder="Search...">
    <nav class="links">
      <ul>
        <li><router-link to="/"><i class="fas fa-home"></i>
         <div class="icon-title">Home</div></router-link></li>
        <li><router-link :to="'/profile/' + getMyUser"><i class="fas fa-user"></i>
         <div class="icon-title">Profile</div></router-link></li>
        <li><router-link to="/friends"><i class="fas fa-users"></i>
         <div class="icon-title">Friends</div></router-link></li>
        <li><router-link to="/messaging"><i class="fas fa-comment-alt"></i>
         <div class="icon-title">Messaging</div></router-link></li>
        <li><a @click="logout"><i class="fas fa-sign-out-alt"></i>
         <div class="icon-title">Logout</div></a></li>
      </ul>
    </nav>
  </nav>
</header>
</template>

<script>
import { auth } from '../main'

export default {
  data () {
    return {
      user: null
    }
  },
  computed: {
    getMyUser () {
      return this.$store.state.profile.username
    }
  },
  methods: {
    logout () {
      auth.signOut().then(data => {
        this.$router.push('/login')
      }).catch((error) => {
        alert(error.message)
      })
    }
  }
}

</script>

<style scoped>

#header {
    background-color: #2620d8;
    padding-left: 80px;
    padding-right: 80px;
    width: 100%;
    height: 50px;
    position: fixed;
    text-align: center;
    top: 0;
    left: 0;
    z-index: 9999;
}

.headerNav {
    display: flex;
    align-items: center;
    width: 1050px;
    height: 50px;
}

#logo {
    width: 180px;
    color: white;
    flex-grow: 1;
}

#search {
    width: 230px;
    height: 35px;
    border-radius: .2em;
    border: none;
    background-color: whitesmoke;
    flex-grow: 2;
    outline: none;
}

.search-button {
    color: black;
    outline: none;
}

.links {
    flex-grow: 1;
}

.links ul {
    display: flex;
    vertical-align: middle;
    text-align: right;
    list-style: none;
    justify-content: space-between;
    text-align: center;
}
.links a {
    color: #edeaea;
    text-decoration: none;
    cursor: pointer;
}
.links a:hover {
  color: white;
}
.links i {
  text-align: center;
  font-size: 22px;
}
.icon-title {
  font-size: small;
  text-align: center;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

</style>
