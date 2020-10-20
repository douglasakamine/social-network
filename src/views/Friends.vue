<template>
<div class="friends-page">
  <Header />
  <div class="friend-solicitation" v-for="pending in pendingList" :key="pending.id">
    <p><router-link :to="'/profile/' + pending">{{ pending }}</router-link>
    is inviting you to join friends.</p>
    <div class="button-box">
    <button id="accept-solicitation" @click="acceptSolicitation(pending)">Accept</button>
    <button id="reject-solicitation" @click="rejectSolicitation(pending)">Reject</button>
    </div>
  </div>
    <ul class="friends">
    <li class="friend" v-for="(friend, index) in friends" :key="friend.id">
      <span v-if="friend.photo" class="friendPhoto"><img :src="friend.photo" alt="friend photo"></span>
      <span v-else class="friendPhoto"><img src="../assets/images/default-user.jpg" alt="friend photo"></span>
      <span class="friendName"><router-link :to="'/profile/' + friend.username">{{ friend.name }}</router-link></span>
      <button @click.prevent="addFriendButton(friend.username, index)" class="btn">{{ buttonAddFriendDescription(friend.isFriend) }}</button>
    </li>
    </ul>
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import { mapGetters, mapActions } from 'vuex'
import Utils from '@/mixins/UtilsMixin'
import { db, dbUsers, auth } from '../main'
import firebase from 'firebase'

export default {
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      friends: 'getFriends',
      pendingList: 'getPendingList'
    })
  },
  methods: {
    ...mapActions([
      'addFriend'
    ]),
    addFriendButton (friend, index) {
      if (this.$store.state.profile.friends.includes(friend)) {
        dbUsers.doc(this.$store.state.profile.username)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(friend)
          })
        this.$store.dispatch('removeFromUserArrays', { array: 'friends', index: index })
        dbUsers.doc(friend)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(this.$store.state.profile.username)
          })
        this.$store.dispatch('removeFromFriendsArrays', { friendIndex: index, array: 'friends', index: index })
        this.$store.dispatch('setIsFriendButton', { user: index, value: 'notFriend' })
      } else {
        dbUsers.doc(friend)
          .update({
            pendingList: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profile.username)
          })
        this.$store.dispatch('addIntoFriendsArrays', { friendIndex: index, array: 'pendingList', user: this.$store.state.profile.username })
        this.$store.dispatch('setIsFriendButton', { user: index, value: 'pending' })
      }
    },
    buttonAddFriendDescription (isFriend) {
      switch (isFriend) {
        case 'friend': return 'Remove'
        case 'notFriend': return 'Add'
        case 'pending': return 'Pending'
      }
    },
    acceptSolicitation (pendingUser) {
      var index = this.$store.state.friends.findIndex(x => x.id === pendingUser)
      db.collection('users').doc(this.$store.state.profile.username)
        .update({
          pendingList: firebase.firestore.FieldValue.arrayRemove(pendingUser)
        })
      this.$store.dispatch('removeFromUserArrays', { array: 'pendingList', index: index })
      db.collection('users').doc(this.$store.state.profile.username)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(pendingUser)
        })
      this.$store.dispatch('addIntoUserArrays', { array: 'friends', user: pendingUser })
      db.collection('users').doc(pendingUser)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profile.username)
        })
      this.$store.dispatch('addIntoFriendsArrays', { friendIndex: index, array: 'friends', user: this.$store.state.profile.username })
      this.$store.dispatch('setIsFriendButton', { user: index, value: 'friend' })
    },
    rejectSolicitation (pendingUser) {
      var index = this.$store.state.friends.findIndex(x => x.id === pendingUser)
      db.collection('users').doc(this.$store.state.profile.username)
        .update({
          pendingList: firebase.firestore.FieldValue.arrayRemove(pendingUser)
        })
      this.$store.dispatch('removeFromUserArrays', { array: 'pendingList', index: index })
      this.$store.dispatch('setIsFriendButton', { user: index, value: 'notFriend' })
    }
  },
  async beforeMount () { // Getting users friends from DB and setting in State vuex
    await dbUsers.get().then(querySnapshot => {
      querySnapshot.forEach(users => {
        if (users.data().username === this.$store.state.profile.username) {
          return // Skip your own profile
        }
        var user = {
          id: users.id,
          name: users.data().name,
          photo: users.data().photo,
          username: users.data().username,
          isFriend: 'notFriend',
          pendingList: users.data().pendingList,
          friends: users.data().friends
        }
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
}

.friendPhoto img {
  width: 70px;
  height: 80px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  flex-grow: 2;
  cursor: pointer;
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
