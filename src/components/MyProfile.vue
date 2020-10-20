<template>
<div class="my-profile" v-cloak>
    <div class="profile-header">
      <button id="upload-background" @click="$refs.backgroundInput.click()"><i class="fas fa-camera"> Change Background</i></button>
      <input id="input-upload-background" @change="changeProfileImages('backgroundImg')" type="file" style="display: none" ref="backgroundInput">
        <img v-if="profile.backgroundImg" id="background-image" :src="profile.backgroundImg" alt="Background Photo">
        <img v-else id="background-image-substitute" src="../assets/images/default-background.jpg" alt="Background Photo">
    </div>
    <div class="div-profile-photo">
      <img v-if="profile.photo" id="profile-photo" :src="profile.photo" alt="Profile Photo">
      <img v-else id="profile-photo-substitute" src="../assets/images/default-user.jpg" alt="Profile Photo">
       <input id="input-upload-photo" @change="changeProfileImages('photo')" type="file" style="display: none" ref="photoInput">
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
      <Album />
    <EditProfileForm v-show="getEditProfileInfoButton"></EditProfileForm>
    <MyFeed />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditProfileForm from '@/components/EditProfileForm'
import MyFeed from '@/components/MyFeed'
import Album from '@/components/Album'
import Utils from '../mixins/UtilsMixin'

export default {
  components: {
    EditProfileForm,
    MyFeed,
    Album
  },
  computed: {
    ...mapGetters({
      profile: 'getProfileInfo',
      getEditProfileInfoButton: 'getEditProfileInfoButton'
    })
  },
  methods: {
    async changeProfileImages (input) {
      var fileURL = await this.uploadFile(event.target.files[0])
      await this.updateProfile({ data: input, value: fileURL })
    },
    openEditProfile () {
      this.$store.dispatch('SetEditProfileInfoButton', true)
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
#profile-photo-substitute {
    width: 100%;
    height: auto;
}
.user-name {
    font: bold;
    font-size: xx-large;
    margin: 40px auto 10px auto;
    text-align: center;
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
  border-radius: .5em;
  outline: none;
  border: none;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  cursor: pointer;
  height: 25px;
}
#upload-photo {
  position: absolute;
  right: 40%;
  top: 280px;
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
