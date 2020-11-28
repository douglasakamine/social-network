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
import Utils from '../mixins/UtilsMixin'

export default {
  components: {
    ProfileNav,
    Feed,
    AdsBar,
    PostForm,
    Header
  },
  beforeMount () {
    this.getMyPosts()
    this.getFriendsPosts()
  },
  mixins: [Utils],
  beforeDestroy () {
    this.$store.state.posts = []
  }
}
</script>

<style scoped>

</style>
