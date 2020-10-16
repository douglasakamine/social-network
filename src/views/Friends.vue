<template>
<div class="friends-page">
  <Header />
  <div class="friend-solicitation" v-for="(pending, index) in pendingList" :key="pending.id">
    <p>{{ pending }} is inviting you to join friends.</p>
    <button id="accept-solicitation" @click="acceptSolicitation(pending, index)">Accept</button>
    <button id="reject-solicitation" @click="rejectSolicitation(pending, index)">Reject</button>
  </div>
    <ul class="friends">
    <li class="friend" v-for="(friend, index) in friends" :key="friend.id">
      <span class="friendPhoto"><img :src="friend.photo" alt="friend photo"></span>
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
      console.log(friend, index)
      if (this.$store.state.profile.friends.includes(friend)) {
        dbUsers.doc(this.$store.state.profile.username)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(friend)
          })
        dbUsers.doc(friend)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(this.$store.state.profile.username)
          })
        this.$store.dispatch('setIsFriendButton', { user: index, value: 'notFriend' })
      } else {
        dbUsers.doc(friend)
          .update({
            pendingList: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profile.username)
          })
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
    acceptSolicitation (user, index) {
      db.collection('users').doc(this.$store.state.profile.username)
        .update({
          pendingList: firebase.firestore.FieldValue.arrayRemove(user)
        })
      this.$store.dispatch('removeFromPendingList', index)
      db.collection('users').doc(this.$store.state.profile.username)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(user)
        })
      db.collection('users').doc(user)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profile.username)
        })
      this.$store.dispatch('setIsFriendButton', { user: index, value: 'friend' })
    },
    rejectSolicitation (user, index) {
      db.collection('users').doc(this.$store.state.profile.username)
        .update({
          pendingList: firebase.firestore.FieldValue.arrayRemove(user)
        })
      this.$store.dispatch('removeFromPendingList', index)
      this.$store.dispatch('setIsFriendButton', { user: index, value: 'notFriend' })
    }
  },
  beforeMount () {
    this.getFriendsList()
  },
  async beforeCreate () {
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
  margin: 70px auto auto auto;
  background-color: white;
}
</style>
