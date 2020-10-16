<template>
<div class="my-profile" v-cloak>
    <div class="profile-header" v-if="profile.backgroundImg">
      <i id="upload-background" class="fas fa-camera"></i>
        <img id="background-image" :src="profile.backgroundImg" alt="Background Photo">
    </div>
    <div class="div-profile-photo">
      <img id="profile-photo" :src="profile.photo" alt="Profile Photo">
       <input id="input-upload-photo" @change="changeProfilePhoto" type="file" style="display: none" ref="photoInput">
    </div>
    <div id="upload-photo" @click="$refs.photoInput.click()"><i class="fas fa-camera-retro"></i></div>
       <div class="user-name" v-text="profile.name"></div>
       <i @click="openEditProfile" id="edit-name" class="far fa-edit"> Edit Profile</i>
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
    <EditProfileForm v-show="showEditProfileInfo"></EditProfileForm>
    <MyFeed />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditProfileForm from '@/components/EditProfileForm'
import MyFeed from '@/components/MyFeed'
import Utils from '../mixins/UtilsMixin'

export default {
  components: {
    EditProfileForm,
    MyFeed
  },
  data () {
    return {
      showEditProfileInfo: false
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfileInfo',
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
