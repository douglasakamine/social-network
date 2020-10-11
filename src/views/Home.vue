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

export default {
  components: {
    ProfileNav,
    Feed,
    AdsBar,
    PostForm,
    Header
  }
}
</script>

<style scoped>

</style>
