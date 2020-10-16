import { st, dbUsers, dbPosts } from '../main'

export default {
  methods: {
    async uploadFile (rawFile) {
      var uploadTask = st.child(rawFile.name).put(rawFile)
      var url = await uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        return downloadURL
      })
      return url
    },
    async updateProfile (payload) {
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
    getFriendsList () {
      dbUsers.get().then(querySnapshot => {
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
          this.$store.dispatch('setFriendsList', user)
        })
      })
    },
    async getUserFriendData (user) {
      await dbUsers.doc(user).get().then(doc => {
        this.$store.dispatch('setFriendProfile', doc.data())
      })
    },
    getFriendsPosts () {
      var friends = this.$store.getters.getProfileInfo.friends
      friends.forEach(friend => {
        dbPosts.where('username', '==', friend)
          .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.$store.dispatch('setFeed', doc.data())
            })
          })
      })
    },
    getMyPosts () {
      dbPosts.where('username', '==', this.$store.getters.getProfileInfo.username)
        .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.$store.dispatch('setFeed', doc.data())
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
        ads: [{
          id: '1',
          adsImage: 'advertising-word-block.jpg',
          adsDescription: 'Buy this product, Its Awesome!'
        }]
      })
    }
  }
}
