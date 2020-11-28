<template>
  <div id="app" v-cloak>

  <router-view></router-view>

  </div>
</template>

<script>
import { auth, dbUsers, dbChats } from './main'
import Utils from './mixins/UtilsMixin'
import firebase from 'firebase'

export default {
  data () {
    return {
      unsubscribe: null,
      unsub: null
    }
  },
  name: 'App',
  components: {
  },
  beforeCreate () {
    auth.onAuthStateChanged(user => {
      if (user) {
        dbUsers.doc(user.displayName).get().then(doc => {
          this.$store.dispatch('setProfileInfo', doc.data())
        })
        this.unsubscribe = dbUsers.doc(user.displayName).collection('messagingContacts')
          .onSnapshot(snapshot => {
            var chat = []
            snapshot.forEach(doc => {
              var usersChat = {
                chatId: doc.data().chatId,
                userClicked: false,
                chat: [],
                name: doc.data().name,
                photo: doc.data().photo,
                username: doc.data().username
              }
              this.unsub = dbChats.doc(doc.data().chatId).collection('messages').orderBy('time')
                .onSnapshot(snap => {
                  snap.docChanges().forEach(change => {
                    if (change.type === 'added') {
                      var chat = {
                        id: change.doc.id,
                        content: change.doc.data().content,
                        from: change.doc.data().from,
                        name: change.doc.data().name,
                        time: change.doc.data().time,
                        read: change.doc.data().read
                      }
                      if (!change.doc.data().time && snap.metadata.hasPendingWrites) {
                        chat.time = firebase.firestore.Timestamp.now()
                      }
                      usersChat.chat.push(chat)
                      if (change.doc.data().from !== user.displayName && change.doc.data().read === false) {
                        // this.$store.dispatch('setNotification', 1)
                      }
                    }
                  })
                })
              chat.push(usersChat)
            })
            this.$store.dispatch('setChat', chat)
          })
      } else {
        if (this.unsubscribe !== null &&
        this.unsub !== null) {
          this.unsubscribe()
          this.unsub()
        }
        this.resetState()
      }
    })
  },
  mixins: [Utils]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

body {
    background-color: #e5e3e3;
    width: 100%;
    font-family: 'Open Sans', sans-serif, Verdana, Tahoma;
    font-size: 13px;
    margin: 0;
    padding: 0;
}
[v-cloak] {
  display: none;
}
</style>
