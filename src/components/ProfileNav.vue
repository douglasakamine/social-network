<template>
  <aside v-if="profile" id="profileNav" v-cloak>
    <img v-cloak id="profilePhoto" :src="profile.photo" alt="avatar">
     <hr style="color:black">
    <div><h3><router-link :to="'/profile/' + profile.username">{{ profile.name }}</router-link></h3></div>
    <div><p><strong>Work at:</strong> {{ profile.work }}</p></div>
    <div><p><strong>Birth:</strong> {{ profile.birth }}</p></div>
    <div v-if="profile.friends"><p><strong>{{ profile.friends.length }}</strong> Friends</p></div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      profile: 'getProfileInfo'
    })
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}

#profileNav {
    border: none;
    width: 200px;
    text-align: center;
    background-color: whitesmoke;
    position: fixed;
    top: 70px;
    left: 100px;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    border-radius: 1em;
}

#profilePhoto {
    width: 170px;
    height: 170px;
    overflow: hidden;
    margin: 5px;
    border: none;
    border-radius: 50%;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
[v-cloak] {
  display: none;
}
a {
  text-decoration: none;
}
</style>
