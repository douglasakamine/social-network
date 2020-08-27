<template>
<section id="feed">
            <div class="post" v-for="post in posts.slice().reverse()" :key="post.id">
                <h2>{{ post.name }}</h2>
                <p>{{ post.content}}</p>
                <img id="postPhoto" src="../assets/images/paisagem.jpg" alt="paisagem">
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
    padding: 10px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    margin-bottom: 10px;
}

</style>
