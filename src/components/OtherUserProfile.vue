<template>
<div class="my-profile">
    <div class="profile-header">
        <img v-if="profile.backgroundImg" id="background-image" :src="profile.backgroundImg" alt="Background Photo">
        <img v-else id="background-image" src="../assets/images/default-background.jpg" alt="Background Photo">
    </div>
    <div class="div-profile-photo">
      <img v-if="profile.photo" id="profile-photo" :src="profile.photo" alt="Profile Photo">
      <img v-else id="profile-photo" src="../assets/images/default-user.jpg" alt="Profile Photo">
    </div>
       <div class="user-name" v-text="profile.name"></div>
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
    <FriendsFeed />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Utils from '../mixins/UtilsMixin'
import FriendsFeed from './FriendsFeed'
import Album from '@/components/Album'

export default {
  components: {
    FriendsFeed,
    Album
  },
  computed: {
    ...mapGetters({
      profile: 'getFriendProfile',
      albumPhotos: 'getAlbumPhotos'
    })
  },
  async created () {
    await this.getUserFriendData(this.$route.params.id)
    this.getFriendsPosts()
  },
  mixins: [Utils]
}
</script>

<style scoped>
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
