<template>
<div class="friends-page">
  <Header />
  <div class="friend-solicitation" v-for="(pending, index) in pendingList" :key="pending.id">
    <p><router-link :to="'/profile/' + pending">{{ pending }}</router-link>
    is inviting you to join friends.</p>
    <div class="button-box">
    <button id="accept-solicitation" @click="acceptSolicitation(pending, index)">Accept</button>
    <button id="reject-solicitation" @click="rejectSolicitation(pending, index)">Reject</button>
    </div>
  </div>
    <ul class="friends">
    <li class="friend" v-for="(friend, index) in friends" :key="friend.id">
      <span v-if="friend.photo" class="friendPhoto"><router-link :to="'/profile/' + friend.username">
      <img :src="friend.photo" alt="friend photo"></router-link></span>
      <span v-else class="friendPhoto"><img src="../assets/images/default-user.jpg" alt="friend photo"></span>
      <span class="friendName"><router-link :to="'/profile/' + friend.username">{{ friend.name }}</router-link></span>
      <button @click.prevent="addFriendButton(friend, index)" class="btn">{{ buttonAddFriendDescription(friend.isFriend) }}</button>
    </li>
    </ul>
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import { mapGetters, mapActions } from 'vuex'
import Utils from '@/mixins/UtilsMixin'
import { dbUsers, auth } from '../main'

export default {
  data () {
    return {
      pendingList: []
    }
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      friends: 'getFriends'
    })
  },
  methods: {
    ...mapActions([
      'addFriend'
    ]),
    addFriendButton (friend, index) {
      if (friend.isFriend === 'friend') {
        dbUsers.doc(this.$store.state.profile.username).collection('friends')
          .doc(friend.username).delete()
        dbUsers.doc(friend.username).collection('friends')
          .doc(this.$store.state.profile.username).delete()
        this.friends[index].isFriend = 'notFriend'
      } else if (friend.isFriend === 'notFriend') {
        dbUsers.doc(friend.username).collection('friends')
          .doc(this.$store.state.profile.username).set({
            status: 'pending'
          })
        this.friends[index].isFriend = 'pending'
      } else {
        // Do something
      }
    },
    buttonAddFriendDescription (isFriend) {
      switch (isFriend) {
        case 'friend': return 'Remove'
        case 'notFriend': return 'Add'
        case 'pending': return 'Pending'
      }
    },
    acceptSolicitation (pendingUser, index) {
      dbUsers.doc(this.$store.state.profile.username).collection('friends')
        .doc(pendingUser).update({
          status: 'friend'
        })
      dbUsers.doc(pendingUser).collection('friends')
        .doc(this.$store.state.profile.username).set({
          status: 'friend'
        }).then(() => {
          var userIndex = this.friends.findIndex(x => x.username === pendingUser)
          this.friends[userIndex].isFriend = 'friend'
          this.pendingList.splice(index, 1)
        }).catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    rejectSolicitation (pendingUser, index) {
      dbUsers.doc(this.$store.state.profile.username).collection('friends')
        .doc(pendingUser).delete().then(() => {
          var userIndex = this.friends.findIndex(x => x.username === pendingUser)
          this.friends[userIndex].isFriend = 'notFriend'
          this.pendingList.splice(index, 1)
        }).catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }
  },
  async mounted () { // Getting users friends from DB and setting in State vuex
    await dbUsers.get().then(querySnapshot => {
      querySnapshot.forEach(async users => {
        if (users.data().username === this.$store.state.profile.username) {
          return // Skip your own profile
        }
        var user = {
          id: users.id,
          name: users.data().name,
          photo: users.data().photo,
          username: users.data().username,
          isFriend: ''
        }
        await dbUsers.doc(this.$store.state.profile.username).collection('friends')
          .doc(user.username).get().then(async doc => {
            if (doc.data() === undefined) {
              var status = ''
              await dbUsers.doc(user.username).collection('friends')
                .doc(this.$store.state.profile.username).get().then(doc => {
                  if (doc.data() === undefined) {
                    status = 'notFriend'
                  } else {
                    status = doc.data().status
                  }
                })
              if (status === 'pending') {
                user.isFriend = 'pending'
              } else {
                user.isFriend = 'notFriend'
              }
            } else if (doc.data().status === 'pending') {
              user.isFriend = 'pending'
              this.pendingList.push(user.username)
            } else if (doc.data().status === 'friend') {
              user.isFriend = 'friend'
            }
          })
        this.$store.dispatch('setUsersList', user)
      })
    })
  },
  async beforeCreate () { // Getting user profile from DB
    var user = auth.currentUser
    if (user) {
      await dbUsers.doc(user.displayName).get().then(doc => {
        this.$store.dispatch('setProfileInfo', doc.data())
      })
    }
  },
  destroyed () {
    this.$store.state.friends = []
  },
  mixins: [Utils]
}

</script>

<style scoped>

.friends-page {
  width: auto;
}

.friends {
    text-align: center;
    width: 900px;
    margin-top: 70px;
    padding: 0;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
}

.friend {
   margin: 10px;
   padding: 10px;
   border: none;
   background-color: whitesmoke;
   box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 380px;
   height: 80px;
   border-radius: 1em;
}

.btn {
  flex-grow: 1;
  top: 50%;
  margin-top: -10px;
  width: 40px;
  height: 30px;
  font-weight: bold;
  border: none;
  color: white;
  background-color: blue;
  font-size: 16px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.friendPhoto img {
  width: 70px;
  height: 80px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  flex-grow: 2;
  cursor: pointer;
  object-fit: cover;
}

.friendName {
  flex-grow: 3;
  text-align: left;
  padding-left: 15px;
  position: relative;
}

.friendName a {
  text-align: left;
  padding-left: 5px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  font-size: 110%;
  text-decoration: none;
  font-weight: bold;
  color: black;
}
.friend-solicitation {
  width: 300px;
  text-align: center;
  padding: 5px;
  margin: 70px auto auto auto;
  background-color: white;
  border-radius: 1em;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
.button-box {
  display: flex;
  justify-content: space-between;
}
#accept-solicitation {
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
#reject-solicitation {
    color: white;
    font-size: 15px;
    border: none;
    background-color: red;
    font-size: 16px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    margin: 4px;
    border-radius: .2em;
    cursor: pointer;
}
</style>
