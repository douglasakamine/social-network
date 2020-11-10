<template>
  <header id="header">
    <nav class="headerNav">
     <div id="logo"><h1>Social Network</h1></div>
     <input id="search" type="search" v-model="searchCharacter" placeholder="Search...">
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
    <div v-if="searchCharacter" class="user-search-bar">
        <ul v-if="usersSearchBar.length > 0"><li class="search-friend-li"
        v-for="user in usersSearchBar" :key="user.username">
        <router-link :to="'/profile/' + user.username">
          <img :src="user.photo" alt="Friend Photo">
         <p>{{ user.name }}</p>
        </router-link>
        </li>
        </ul>
        <ul v-else><li class="search-friend-li">
         <p>No data found</p>
        </li>
        </ul>
    </div>
</header>
</template>

<script>
import { auth, dbUsers } from '../main'

export default {
  data () {
    return {
      user: null,
      searchCharacter: '',
      usersSearchBar: []
    }
  },
  computed: {
    getMyUser () {
      return auth.currentUser.displayName
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
  },
  watch: {
    searchCharacter: function (newValue) {
      if (newValue !== '') {
        var users = []
        dbUsers
          .where('username', '>=', newValue)
          .where('username', '<', newValue + 'z')
          .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              if (doc.data().username === this.getMyUser) {
                return
              }
              users.push(doc.data())
            })
          })
        this.usersSearchBar = users
      } else {
        this.usersSearchBar = ''
      }
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
    z-index: 9000;
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
.user-search-bar {
  width: 417px;
  background-color: white;
  position: absolute;
  top: 42px;
  left: 353px;
  box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
.search-friend-li {
  list-style: none;
}
.search-friend-li a {
  display: flex;
  height: 30px;
  margin: 0;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  list-style: none;
}
.search-friend-li a img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.search-friend-li a p {
  flex-grow: 1;
  padding: 2px 2px 2px 40px;
  font-weight: bold;
  text-align: start;
}

</style>
