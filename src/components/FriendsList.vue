<template>
    <div class="friends-box">
      <div class="search-div">
        <div class="search-container">
          <div class="search-icon">
        <i class="fas fa-search" />
        </div>
       <input id="search-friend" type="search"
       placeholder="Search friend..." v-model="searchCharacter">
       </div>
       </div>
      <div v-if="searchCharacter" class="user-search-bar">
        <ul v-if="usersSearchBar.length > 0"><li class="search-friend-li"
        v-for="user in usersSearchBar" :key="user.username" @click="initNewChat(user)">
          <img :src="user.photo" alt="Friend Photo">
         <p>{{ user.name }}</p>
        </li>
        </ul>
        <ul v-else><li class="search-friend-li">
         <p>No data found</p>
        </li>
        </ul>
        </div>
      <ul class="friend-list">
        <li :class="{ 'friend-li': true, 'highlighted': friend.userClicked }" v-for="(friend, index) in usersFriends" :key="friend.chatId"
         @click="getChat(index)">
         <img :src="friend.photo" alt="Friend Photo">
         <div class="container-li">
         <p>{{ friend.name }}</p>
         <div class="chat-summary">
           <p v-if="friend.chat[friend.chat.length -1]" v-html="checkName(friend.chat[friend.chat.length -1].from) + truncate(friend.chat[friend.chat.length -1].content, 10)"></p>
          </div>
         </div>
        </li>
     </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dbUsers, dbChats } from '../main'

export default {
  data () {
    return {
      searchCharacter: '',
      usersSearchBar: []
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfileInfo',
      usersFriends: 'getChat'
    })
  },
  watch: {
    searchCharacter: function (newValue) {
      if (newValue !== '') {
        var chatUsers = []
        dbUsers
          .where('username', '>=', newValue.toLowerCase())
          .where('username', '<', newValue.toLowerCase() + 'z')
          .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var index = this.usersFriends.findIndex(x => x.username === doc.data().username)
              if (index !== -1 || doc.data().username === this.profile.username) {
                return
              }
              chatUsers.push(doc.data())
            })
          })
        this.usersSearchBar = chatUsers
      } else {
        this.usersSearchBar = ''
      }
    }
  },
  methods: {
    truncate (text, num) {
      if (text.length > num) {
        return text.substring(0, num) + ' ...'
      } else {
        return text
      }
    },
    getChat (index) {
      this.$store.dispatch('setCurrentChat', index)

      this.usersFriends.forEach(user => {
        user.userClicked = false
      })
      this.usersFriends[index].userClicked = true
    },
    async initNewChat (contact) {
      var users = {}
      users[this.profile.username] = true
      users[contact.username] = true
      await dbChats.add({ users }).then(docRef => {
        dbUsers.doc(this.profile.username).collection('messagingContacts')
          .doc(contact.username).set({
            chatId: docRef.id,
            username: contact.username,
            name: contact.name,
            photo: contact.photo
          })
        dbUsers.doc(contact.username).collection('messagingContacts')
          .doc(this.profile.username).set({
            chatId: docRef.id,
            username: this.profile.username,
            name: this.profile.name,
            photo: this.profile.photo
          })
        this.searchCharacter = ''
      })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    checkName (user) {
      if (user === this.profile.username) {
        return 'You: '
      } else {
        return user + ': '
      }
    }
  }
}
</script>

<style scoped>
.friends-box {
    display: flex;
    width: 350px;
    flex-direction: column;
}

.friend-list {
    overflow: scroll;
    list-style: none;
}

.friend-li {
    display: flex;
    height: 70px;
    padding: 5px;
    margin: 0;
    border-bottom: 1px solid #cdcfd2;
    cursor: pointer;
    align-items: center;
}
.container-li {
    display: flex;
    flex-direction: column;
}
.search-friend-li {
  height: 60px;
  margin: 0;
  align-items: center;
  cursor: pointer;
  display: flex;
}
.search-friend-li img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
}
.search-friend-li p {
  flex-grow: 1;
  padding: 2px 2px 2px 40px;
  font-weight: bold;
}

.friend-li img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
}

.friend-li p {
  flex-grow: 1;
  padding: 2px 2px 2px 40px;
  font-weight: bold;
  margin: unset;
}
#search-friend {
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
}
.search-container {
  display: flex;
}
.search-icon {
  background-color: white;
  text-align: center;
  width: 30px;
  padding: 5px;
}
.fa-search {
  font-size: 20px;
  color: grey;
}
.user-search-bar {
  width: 313px;
  background-color: white;
  position: absolute;
  top: 106px;
  box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
.highlighted {
  background-color: #CDD3CE;
  border-radius: .2em;
}
.chat-summary {
  display: block;
}
.chat-summary p {
  font-weight: normal;
}

</style>
