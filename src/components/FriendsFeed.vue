<template>
 <div id="my-feed">
  <div class="post" v-for="post in posts" :key="post.id">
    <div class="post-header">
    <img id="photo" :src="post.photo">
    <h3>{{ post.name }}</h3>
    <div class="post-date">{{ post.date | moment("from", "now") }}</div>
    </div>
    <div class="post-content"><span v-html="post.content"></span></div>
    <img id="postImage" :src="post.file">
    <div class="like"><a href="click"><i class="far fa-thumbs-up fa-2x"></i><strong> Like</strong></a></div>
  </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      posts: 'getFriendsPosts'
    })
  }
}
</script>

<style scoped>
#my-feed {
    text-align: center;
    width: 500px;
    margin-top: 10px;
}
.post {
    border: none;
    text-align: center;
    background-color: whitesmoke;
    padding: 10px 0px 1px 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    margin-bottom: 10px;
    border-radius: 1em;
}

.post-header {
  display: flex;
  align-content: center;
  align-items: center;
  margin: 10px 20px 10px 20px;
}

#postImage {
  width: 600px;
}

.post-content {
  width: 550px;
  text-align: left;
  margin: 5px 25px 10px 25px;
}

#photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.post-header h3 {
  margin-left: 15px;

}
.post-date {
  flex-grow: 1;
  text-align: right;
}
.like {
  display: flex;
  margin: 5px 5px 5px 10px;
}
.like a {
  text-decoration: none;
  font-size: 13px;
  padding: 2px;
  margin: 2px;
}

</style>
