<template>
<div class="home">
<Header />
<ProfileNav />
<PostForm />
<Feed />
<AdsBar />
</div>
</template>

<script>
// @ is an alias to /src

import ProfileNav from '@/components/ProfileNav'
import Feed from '@/components/Feed'
import AdsBar from '@/components/AdsBar'
import PostForm from '@/components/PostForm'
import Header from '@/components/Header'
import { auth, dbUsers } from '../main'
import Utils from '../mixins/UtilsMixin'

export default {
  components: {
    ProfileNav,
    Feed,
    AdsBar,
    PostForm,
    Header
  },
  async beforeCreate () {
    var user = auth.currentUser
    if (user) {
      await dbUsers.doc(user.displayName).get().then(doc => {
        this.$store.dispatch('setProfileInfo', doc.data())
      })
      this.getFriendsPosts()
      this.getMyPosts()
    }
  },
  destroyed () {
    this.resetState()
  },
  mixins: [Utils]
}
</script>

<style scoped>

</style>
