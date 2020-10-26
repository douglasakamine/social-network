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
    async getUserFriendData (user) {
      await dbUsers.doc(user).get().then(doc => {
        var user = doc.data()
        if (this.$store.state.profile.friends.includes(doc.data().username)) {
          user.isFriend = 'friend'
        } else if (this.$store.state.profile.pendingList.includes(doc.data().username) ||
        doc.data().pendingList.includes(this.$store.state.profile.username)) {
          user.isFriend = 'pending'
        } else {
          user.isFriend = 'notFriend'
        }
        this.$store.dispatch('setFriendProfile', user)
      })
    },
    getFriendsPosts () {
      var friends = this.$store.getters.getProfileInfo.friends
      friends.forEach(friend => {
        dbPosts.where('username', '==', friend)
          .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var post = doc.data()
              post.id = doc.id
              this.$store.dispatch('setFeed', post)
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
        clickedPhoto: 0
      })
    }
  }
}
