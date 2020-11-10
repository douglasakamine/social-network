import { st, dbUsers, dbPosts } from '../main'

export default {
  methods: {
    async uploadFile (rawFile) {
      await st.child(rawFile.name).put(rawFile)
      var url = await st.child(rawFile.name).getDownloadURL().then(downloadURL => {
        return downloadURL
      })
      return url
    },
    updateProfile (payload) {
      var data = payload.data
      var value = payload.value
      dbUsers.doc(this.$store.state.profile.username).update({ [data]: value })
        .then(() => {
          this.$store.dispatch('updateProfileInfo', payload)
        })
        .catch(error => {
          console.error('Error writing document: ', error)
        })
    },
    async getUserFriendData (user, myProfileUser) {
      await dbUsers.doc(user).get().then(async friend => {
        var user = friend.data()
        await dbUsers.doc(myProfileUser).collection('friends')
          .doc(user.username).get().then(async doc => {
            if (doc.data() === undefined) {
              user.isFriend = 'notFriend'
            } else if (doc.data().status === 'pending') {
              user.isFriend = 'pending'
            } else if (doc.data().status === 'friend') {
              user.isFriend = 'friend'
            }
          })
        this.$store.dispatch('setFriendProfile', user)
      })
    },
    getFriendsPosts () {
      dbUsers.doc(this.$store.state.profile.username).collection('friends')
        .where('status', '==', 'friend')
        .get().then(querySnapshot => {
          querySnapshot.forEach(friend => {
            dbPosts.where('username', '==', friend.id)
              .get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  var post = doc.data()
                  post.id = doc.id
                  this.$store.dispatch('setFeed', post)
                })
              })
          })
        })
    },
    getMyPosts () {
      dbPosts.where('username', '==', this.$store.getters.getProfileInfo.username)
        .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            var post = doc.data()
            post.id = doc.id
            this.$store.dispatch('setFeed', post)
          })
        })
    },
    resetState () {
      this.$store.replaceState({
        profile: {},
        friendProfile: {},
        posts: [],
        currentImageLink: '',
        friends: [],
        ads: [],
        editProfileInfoButton: false,
        buttonAlbum: false,
        clickedPhoto: 0,
        currentChat: [],
        currentChatId: '',
        messagingFriendList: []
      })
    }
  }
}
