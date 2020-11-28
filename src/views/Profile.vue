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
    <PostForm v-if="userProfile" />
    <Feed />
        <div v-if="userProfile" class="about-box">
            <div v-show="profile.work" class="about-information"><i class="fas fa-briefcase" style="color: grey; font-size: 20px"></i>
            <strong>  Work at </strong>{{ profile.work }}</div>
            <div v-if="profile.birth" class="about-information"><i class="fas fa-birthday-cake" style="color: grey; font-size: 20px"></i>
            <strong>  Birth </strong>{{ profile.birth | moment("MMMM Do YYYY") }}</div>
            <div v-if="profile.friends" class="about-information"><i class="fas fa-user-friends" style="color: grey; font-size: 20px"></i>
              <strong>  {{ profile.friends.length }}</strong> Friends</div>
            <div v-show="profile.city" class="about-information">
              <i class="fas fa-map-marker-alt" style="color: grey; font-size: 20px"></i><strong>  Living in </strong>{{ profile.city }}, {{ profile.country }}</div>
            <hr>
            <div class="about-information"><strong>Profile Description</strong></div>
            <span>{{ profile.description }}</span>
      </div>
         <div v-else class="about-box">
            <div v-show="friendProfile.work" class="about-information"><i class="fas fa-briefcase" style="color: grey; font-size: 20px"></i>
            <strong>  Work at </strong>{{ friendProfile.work }}</div>
            <div v-if="friendProfile.birth" class="about-information"><i class="fas fa-birthday-cake" style="color: grey; font-size: 20px"></i>
            <strong>  Birth </strong>{{ friendProfile.birth | moment("MMMM Do YYYY") }}</div>
            <div v-if="friendProfile.friends" class="about-information"><i class="fas fa-user-friends" style="color: grey; font-size: 20px"></i>
            <strong>  {{ friendProfile.friends.length }}</strong> Friends</div>
            <div v-show="friendProfile.city" class="about-information"><i class="fas fa-map-marker-alt" style="color: grey; font-size: 20px"></i>
            <strong>  Living in </strong>{{ friendProfile.city }}, {{ friendProfile.country }}</div>
            <hr>
            <div class="about-information"><strong>Profile Description</strong></div>
            <span>{{ friendProfile.description }}</span>
      </div>
      <div class="album-body">
          <router-link class="see-all-link" :to="'/photos/' + this.$route.params.id">See all</router-link>
           <div class="album-title">Fotos</div>
           <div v-if="userProfile">
      <div v-if="profile.album" class="photo-album">
      <div class="photo" v-for="photo in profile.album.slice(0, 4)" :key="photo.id">
        <img :src="photo" alt="photo">
      </div>
     </div>
     </div>
     <div v-if="userProfile === false">
     <div v-if="friendProfile.album" class="photo-album">
      <div class="photo" v-for="photo in friendProfile.album.slice(0, 4)" :key="photo.id">
        <img :src="photo" alt="photo">
      </div>
     </div>
     </div>
    </div>
    <EditProfileForm v-show="getEditProfileInfoButton"></EditProfileForm>
    </div>
</div>
</template>

<script>
import Header from '@/components/Header'
import { auth, dbUsers, dbPosts } from '../main'
import Utils from '../mixins/UtilsMixin'
import EditProfileForm from '@/components/EditProfileForm'
import Feed from '@/components/Feed'
import PostForm from '@/components/PostForm'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      userProfile: null
    }
  },
  mixins: [Utils],
  components: {
    Header,
    EditProfileForm,
    Feed,
    PostForm
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
      if (this.friendProfile.isFriend === 'friend') {
        dbUsers.doc(this.$store.state.profile.username).collection('friends')
          .doc(this.friendProfile.username).delete()
        dbUsers.doc(this.friendProfile.username).collection('friends')
          .doc(this.$store.state.profile.username).delete()
        this.friendProfile.isFriend = 'notFriend'
      } else if (this.friendProfile.isFriend === 'notFriend') {
        dbUsers.doc(this.friendProfile.username).collection('friends')
          .doc(this.$store.state.profile.username).set({
            status: 'pending',
            origin: false
          })
        dbUsers.doc(this.$store.state.profile.username).collection('friends')
          .doc(this.friendProfile.username).set({
            status: 'pending',
            origin: true
          })
        this.friendProfile.isFriend = 'pending'
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
    }
  },
  async created () {
    var user = auth.currentUser
    if (user) {
      if (this.$route.params.id === user.displayName) {
        this.userProfile = true
        this.getMyPosts()
      } else {
        this.getUserFriendData(this.$route.params.id, user.displayName)
        dbPosts.where('username', '==', this.$route.params.id)
          .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var post = doc.data()
              post.id = doc.id
              this.$store.dispatch('setFeed', post)
            })
          })
        this.userProfile = false
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    var user = auth.currentUser
    if (user) {
      if (to.params.id === user.displayName) {
        this.$store.state.posts = []
        this.userProfile = true
        this.getMyPosts()
      } else {
        this.getUserFriendData(to.params.id, user.displayName)
        dbPosts.where('username', '==', to.params.id)
          .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              var post = doc.data()
              post.id = doc.id
              this.$store.dispatch('setFeed', post)
            })
          })
        this.$store.state.posts = []
        this.userProfile = false
      }
      next()
    }
  },
  beforeDestroy () {
    this.$store.state.posts = []
  }
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
.feed {
    text-align: center;
    width: 510px;
    margin: 20px 5px 0 0;
    float: right;
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
.post {
    width: 490px;
    margin: 23px 5px 0 0;
    padding: 10px;
    float: right;
}
.album-body {
  margin: 20px 0 0 5px;
  border-radius: 1em;
  background-color: whitesmoke;
  padding: 5px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  width: 400px;
}
.photo-album {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 1em;
}
.album-title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 5px 10px 10px 15px;
}
.photo {
  margin: 5px;
  width: 150px;
  height: 200px;
  cursor: pointer;
}
.photo img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: .4em;
}

/* Slideshow container */
.slideshow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  margin: auto;
  background: #000;
  background-color: rgba(0, 0, 0, 0.8);
  display: table;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* Position the "next button" to the right */
.prev {
  left: 0;
  border-radius: 3px 0 0 3px;
}
.fa-window-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover, .fa-window-close:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
  display: inline-block;
  width: 600px;
}
.fade img {
    width:100%;
    object-fit: cover;
    min-height: 100%
}
.close-button-box {
    text-align: end;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
.see-all-link {
  float: right;
  margin: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: medium;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
</style>
