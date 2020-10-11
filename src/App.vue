<template>
  <div id="app">

  <router-view></router-view>

  </div>
</template>

<script>
import Utils from '@/mixins/UtilsMixin'
import { auth } from '@/main'

export default {
  name: 'App',
  components: {
  },
  beforeMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.getUserData(user.displayName)
      } else {
        this.$store.replaceState({
          profile: {},
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
    })
  },
  destroyed () {
    this.$store.dispatch('clearPostState')
  },
  mixins: [Utils]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

body {
    background-color: #e5e3e3;
    width: 100%;
    font-family: 'Open Sans', sans-serif, Verdana, Tahoma;
    font-size: 13px;
    margin: 0;
    padding: 0;
}
</style>
