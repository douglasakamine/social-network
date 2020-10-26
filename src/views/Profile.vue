<template>
<div class="profile" v-cloak>
    <Header />
 <div class="profile-header" v-cloak>
      <button v-if="userProfile" id="upload-background" @click="$refs.backgroundInput.click()"><i class="fas fa-camera"> Change Background</i></button>
      <input id="input-upload-background" @change="changeProfileImages('backgroundImg')" type="file" style="display: none" ref="backgroundInput">
        <img v-if="userProfile" v-show="profile.backgroundImg" id="background-image" :src="profile.backgroundImg" alt="Background Photo" v-cloak>
        <img v-else v-show="friendProfile.backgroundImg" id="background-image" :src="friendProfile.backgroundImg" alt="Background Photo" v-cloak>
    </div>
    <div class="div-profile-photo">
      <img v-if="userProfile" id="profile-photo" :src="profile.photo" alt="Profile Photo">
      <img v-else id="profile-photo" :src="friendProfile.photo" alt="Profile Photo">
       <input id="input-upload-photo" @change="changeProfileImages('photo')" type="file" style="display: none" ref="photoInput">
    </div>
    <div v-if="userProfile" id="upload-photo" @click="$refs.photoInput.click()"><i class="fas fa-camera-retro"></i></div>
      <div class="profile-body">
        <div class="name-bar">
        <div v-if="userProfile" class="user-name">{{ profile.name }}</div>
        <div v-else class="user-name">{{ friendProfile.name }}</div>
       <button v-if="userProfile" @click="openEditProfile" id="edit-profile-button"><i class="far fa-edit">
           Edit Profile</i></button>
         <button v-else @click="addFriendButton" id="edit-profile-button"><i class="fas fa-user-plus">
           {{ buttonAddFriendDescription(friendProfile.isFriend) }}</i></button>
           </div>
    <MyProfilePostForm v-if="userProfile" />
    <MyFeed />
        <div v-if="userProfile" class="about-box">
            <div class="about-information"><i class="fas fa-briefcase" style="color: grey; font-size: 20px"></i>
            <strong>  Work at </strong>{{ profile.work }}</div>
            <div class="about-information"><i class="fas fa-birthday-cake" style="color: grey; font-size: 20px"></i>
            <strong>  Birth </strong>{{ profile.birth }}</div>
            <div v-if="profile.friends" class="about-information"><i class="fas fa-user-friends" style="color: grey; font-size: 20px"></i>
              <strong>  {{ profile.friends.length }}</strong> Friends</div>
            <div class="about-information">
              <i class="fas fa-map-marker-alt" style="color: grey; font-size: 20px"></i><strong>  Living in </strong>{{ profile.city }}, {{ profile.country }}</div>
            <hr>
            <div class="about-information"><strong>Profile Description</strong></div>
            <span>{{ profile.description }}</span>
      </div>
         <div v-else class="about-box">
            <div class="about-information"><i class="fas fa-briefcase" style="color: grey; font-size: 20px"></i>
            <strong>  Work at </strong>{{ friendProfile.work }}</div>
            <div class="about-information"><i class="fas fa-birthday-cake" style="color: grey; font-size: 20px"></i>
            <strong>  Birth </strong>{{ friendProfile.birth }}</div>
            <div v-if="friendProfile.friends" class="about-information"><i class="fas fa-user-friends" style="color: grey; font-size: 20px"></i>
            <strong>  {{ friendProfile.friends.length }}</strong> Friends</div>
            <div class="about-information"><i class="fas fa-map-marker-alt" style="color: grey; font-size: 20px"></i>
            <strong>  Living in </strong>{{ friendProfile.city }}, {{ friendProfile.country }}</div>
            <hr>
            <div class="about-information"><strong>Profile Description</strong></div>
            <span>{{ friendProfile.description }}</span>
      </div>
      <Album v-if="userProfile" />
      <FriendAlbum v-else />
    <EditProfileForm v-show="getEditProfileInfoButton"></EditProfileForm>
    </div>
</div>
</template>

<script>
import Header from '@/components/Header'
import { auth, dbUsers } from '../main'
import Utils from '../mixins/UtilsMixin'
import EditProfileForm from '@/components/EditProfileForm'
import MyFeed from '@/components/MyFeed'
import Album from '@/components/Album'
import FriendAlbum from '@/components/FriendAlbum'
import MyProfilePostForm from '@/components/MyProfilePostForm'
import { mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  data () {
    return {
      userProfile: false
    }
  },
  components: {
    Header,
    EditProfileForm,
    MyFeed,
    Album,
    FriendAlbum,
    MyProfilePostForm
  },
  computed: {
    ...mapGetters({
      profile: 'getProfileInfo',
      friendProfile: 'getFriendProfile',
      getEditProfileInfoButton: 'getEditProfileInfoButton'
    })
  },
  methods: {
    async changeProfileImages (input) {
      var fileURL = await this.uploadFile(event.target.files[0])
      await this.updateProfile({ data: input, value: fileURL })
    },
    openEditProfile () {
      this.$store.dispatch('setEditProfileInfoButton', true)
    },
    addFriendButton () {
      var friend = this.$route.params.id
      if (this.$store.state.profile.friends.includes(friend)) {
        dbUsers.doc(this.$store.state.profile.username)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(friend)
          })
        var index = this.$store.state.profile.friends.findIndex(x => x.id === friend)
        this.$store.dispatch('removeFromUserArrays', { array: 'friends', index: index })
        dbUsers.doc(friend)
          .update({
            friends: firebase.firestore.FieldValue.arrayRemove(this.$store.state.profile.username)
          })
        // this.$store.dispatch('removeFromProfileFriendArray', { index: index })
        // this.$store.dispatch('setIsFriendButton', { user: index, value: 'notFriend' })
      } else {
        dbUsers.doc(friend)
          .update({
            pendingList: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profile.username)
          })
        // this.$store.dispatch('addIntoFriendsArrays', { friendIndex: index, array: 'pendingList', user: this.$store.state.profile.username })
        // this.$store.dispatch('setIsFriendButton', { user: index, value: 'pending' })
      }
    },
    buttonAddFriendDescription (isFriend) {
      switch (isFriend) {
        case 'friend': return 'Remove'
        case 'notFriend': return 'Add'
        case 'pending': return 'Pending'
      }
    }
  },
  async beforeCreate () {
    var user = auth.currentUser
    if (user) {
      await dbUsers.doc(user.displayName).get().then(doc => {
        this.$store.dispatch('setProfileInfo', doc.data())
      })
      if (this.$route.params.id === this.$store.getters.getProfileInfo.username) {
        this.userProfile = true
        this.getMyPosts()
      } else {
        await this.getUserFriendData(this.$route.params.id)
        this.getFriendsPosts()
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.id === this.$store.getters.getProfileInfo.username) {
      this.$store.state.posts = []
      this.userProfile = true
      this.getMyPosts()
    }
    next()
  },
  destroyed () {
    this.resetState()
  },
  mixins: [Utils]
}
</script>

<style scoped>

v-cloak {
  display: none;
}
.profile {
    width: 950px;
    margin: 50px auto auto auto;
    text-align: center;
    position: relative;
    background-color: white;
}
.profile-body {
  background-color: white;
  width: 100%;
  position: relative;
  overflow: hidden;
}

#edit-profile-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  width: 200px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  outline: none;
  font-size: 16px;
  font-weight: bolder;
  border-radius: 1em;
  float: right;
  cursor: pointer;
}
.profile-inactive {
  opacity: 1;
}
#background-image {
   display: block;
   width: 100% !important;
}
.profile-header {
    height: 300px;
    overflow: hidden;
    position: relative;
}
#profile-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
#profile-photo-substitute {
    width: 100%;
    height: auto;
}
.user-name {
    font: bold;
    font-size: xx-large;
    text-align: center;
    align-self: center;
    flex-basis: 800px;
}
.about-box {
  font-size: 14px;
  width: 382px;
  text-align: initial;
  margin: 23px 0 0 5px;
  border: none;
  background-color: whitesmoke;
  border-radius: 1em;
  padding: 15px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}

#upload-background {
  position: absolute;
  bottom: 10px;
  right: 20px;
  border-radius: .5em;
  outline: none;
  border: none;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  cursor: pointer;
  height: 25px;
}
#upload-photo {
  position: absolute;
  left: 170px;
  top: 320px;
  font-size: 22px;
  color: black;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  padding: 9px;
  cursor: pointer;
  z-index: 3;
}
.div-profile-photo {
  width: 200px;
  height: 200px;
  overflow: hidden;
  position: absolute;
  top: 170px;
  left: 20px;
  margin: auto;
  border: double 5px white;
  border-radius: 50%;
  z-index: 1;
}
#edit-name {
  font-size: 18px;
  cursor: pointer;
  position: relative;
  top: -10px;
  margin: 5px;
  color: mediumblue;
  font-weight: bolder;
  text-decoration: underline;
}
.name-bar {
  display: flex;
  justify-content: space-between;
}
.about-information {
  margin: 5px;
}

</style>
