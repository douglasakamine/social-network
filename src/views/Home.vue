<template>
<div class="home">
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

export default {
  components: {
    ProfileNav,
    Feed,
    AdsBar,
    PostForm
  }
}
</script>
