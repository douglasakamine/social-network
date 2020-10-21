<template>
<div class="profile" v-cloak>
    <Header />
    <MyProfile v-if="profileRoute" v-cloak></MyProfile>
    <OtherUserProfile v-else v-cloak></OtherUserProfile>
</div>
</template>

<script>
import MyProfile from '@/components/MyProfile'
import OtherUserProfile from '@/components/OtherUserProfile'
import Header from '@/components/Header'
import { auth, dbUsers } from '../main'
import Utils from '../mixins/UtilsMixin'

export default {
  data () {
    return {
      profileRoute: false
    }
  },
  components: {
    Header,
    MyProfile,
    OtherUserProfile
  },
  async beforeCreate () {
    var user = auth.currentUser
    if (user) {
      await dbUsers.doc(user.displayName).get().then(doc => {
        this.$store.dispatch('setProfileInfo', doc.data())
      })
      if (this.$route.params.id === this.$store.getters.getProfileInfo.username) {
        this.profileRoute = true
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.params.id === this.$store.getters.getProfileInfo.username) {
      this.profileRoute = true
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

[v-cloak] {
  display: none;
}
.profile {
    width: 900px;
    margin: 50px auto 0 auto;
    text-align: center;
    position: relative;
}
</style>
