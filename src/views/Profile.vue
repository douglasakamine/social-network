<template>
<div class="profile" v-cloak>
    <Header />
    <div class="profile-header">
      <i v-if="myProfileConfig" id="upload-background" class="fas fa-camera"></i>
        <img id="background-image" :src="profile.backgroundImg" alt="Background Photo">
    </div>
    <div class="div-profile-photo">
      <img id="profile-photo" :src="profile.photo" alt="Profile Photo">
       <input id="input-upload-photo" @change="changeProfilePhoto" type="file" style="display: none" ref="photoInput">
    </div>
    <div v-if="myProfileConfig" id="upload-photo" @click="$refs.photoInput.click()"><i class="fas fa-camera-retro"></i></div>
       <div class="user-name">{{ profile.name }}</div>
       <i v-if="myProfileConfig" @click="openEditProfile" id="edit-name" class="far fa-edit"> Edit Profile</i>
        <div class="about-box">
         <div class="information-about">
            <div><strong>Profile Description</strong></div>
            <span>{{ profile.description }}</span>
          </div>
          <div class="information">
            <div id="work-information"><strong>Work at </strong>{{ profile.work }}</div>
            <div id="birth-information"><strong>Birth </strong>{{ profile.birth }}</div>
            <div v-if="profile.friends" id="friends-information"><strong>{{ profile.friends.length }}</strong> Friends</div>
            <div id="address-information"><strong>Living in </strong>{{ profile.city }}, {{ profile.country }}</div>
          </div>
      </div>
    <div class="profile-body">
      <div class="photo-album">
      <div class="photo" v-for="photo in albumPhotos" :key="photo.id">
        <img :src="photo" alt="photo">
      </div>
     </div>
    </div>
    <MyFeed />
    <EditProfileForm v-show="showEditProfileInfo"></EditProfileForm>
</div>
</template>

<script>
import MyFeed from '@/components/MyFeed'
import Header from '@/components/Header'
import EditProfileForm from '@/components/EditProfileForm'
import { mapGetters } from 'vuex'
import Utils from '../mixins/UtilsMixin'

export default {
  components: {
    Header,
    MyFeed,
    EditProfileForm
  },
  data () {
    return {
      showEditProfileInfo: false,
      myProfileConfig: false
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getFriendProfile',
      albumPhotos: 'getAlbumPhotos'
    })
  },
  methods: {
    async changeProfilePhoto () {
      var fileURL = await this.uploadFile(event.target.files[0])
      console.log(fileURL)
      this.updateProfile({ data: 'photo', value: fileURL })
    },
    openEditProfile () {
      this.showEditProfileInfo = !this.showEditProfileInfo
    }
  },
  created () {
    if (this.$route.params.id === this.$store.state.profile.username) {
      this.myProfileConfig = true
    }
    this.getUserFriendData(this.$route.params.id)
  },
  destroyed () {
    this.myProfileConfig = false
  },
  mixins: [Utils]
}
</script>

<style scoped>

[v-cloak] {
  display: none;
}
.profile-inactive {
  opacity: 1;
}
.profile {
    width: 900px;
    margin: 50px auto 0 auto;
    text-align: center;
    position: relative;
}
.profile-body {
  margin: 5px auto auto auto;
  border-radius: 1em;
  background-color: whitesmoke;
  padding: 5px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);

}
#background-image {
   display: block;
   width: 100% !important;
}
.profile-header {
    height: 300px;
    overflow: hidden;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    position: relative;
}
#profile-photo {
    width: 100%;
    height: auto;
}
.user-name {
    font: bold;
    font-size: xx-large;
    margin: 40px auto 10px auto;
    text-align: center;
}
.photo-album {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 1em;
}
.photo {
  margin: 5px;
  width: 250px;
  height: 300px;
  cursor: pointer;
}
.photo img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.about-box {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.information-about {
  position: relative;
  flex-basis: 500px;
  border: none;
  background-color: whitesmoke;
  border-radius: 1em;
  padding: 5px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
.information {
  position: relative;
  flex-basis: 370px;
  background-color: whitesmoke;
  border: none;
  border-radius: 1em;
  padding: 5px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
#upload-background {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
#upload-photo {
  position: absolute;
  right: 40%;
  top: 280px;
  font-size: 23px;
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
  top: 130px;
  left: 38%;
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

</style>
