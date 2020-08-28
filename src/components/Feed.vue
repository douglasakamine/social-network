<template>
<section id="feed">
            <div class="post" v-for="post in posts.slice().reverse()" :key="post.id">
              <div class="post-header">
              <img id="photo" :src="require(`../assets/images/` + post.photo)">
                <h3>{{ post.name }}</h3>
                <div class="post-date">{{ post.date }}</div>
                </div>
                <div class="post-content">{{ post.content}}</div>
                <img id="postImage" :src="require(`../assets/images/` + post.postImage )" alt="paisagem">
            </div>
        </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      posts: 'getPost'
    })
  }
}
</script>

<style scoped>

#feed {
    text-align: center;
    width: 600px;
    margin-top: 10px;
    margin-left: 320px;
}
.post {
    border: none;
    text-align: center;
    background-color: whitesmoke;
    padding: 10px 0px 1px 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    margin-bottom: 10px;
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

</style>
