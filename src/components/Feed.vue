<template>
<section id="feed">
            <div class="post" v-for="post in posts" :key="post.id">
                <h2>{{ post.name }}</h2>
                <p>{{ post.content}}</p>
                    <img id="postPhoto" src="../assets/images/paisagem.jpg" alt="paisagem">
            </div>

            <div class="post">
                <h2>Nome da pessoa</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel
                    lendus accusamus quod eveniet saepe nesciunt, voluptatibus tenetur
                    repudiandae earum in iure eius deleniti velit voluptates nulla
                    exercitationem quaerat facere aperiam corporis!</p>
                    <img id="postPhoto" src="../assets/images/paisagem.jpg" alt="paisagem">
            </div>

            <div class="post">
                <h2>Nome da pessoa</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel
                    lendus accusamus quod eveniet saepe nesciunt, voluptatibus tenetur
                    repudiandae earum in iure eius deleniti velit voluptates nulla
                    exercitationem quaerat facere aperiam corporis!</p>
                    <img id="postPhoto" src="src/images/paisagem.jpg" alt="paisagem">
            </div>

            <div class="post">
                <h2>Nome da pessoa</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repel
                    lendus accusamus quod eveniet saepe nesciunt, voluptatibus tenetur
                    repudiandae earum in iure eius deleniti velit voluptates nulla
                    exercitationem quaerat facere aperiam corporis!</p>
                    <img id="postPhoto" src="src/images/paisagem.jpg" alt="paisagem">
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
    border: solid 1px black;
    text-align: center;
    background-color: whitesmoke;
    padding: 10px;
    box-shadow:  gray 2px 2px 1px;
    margin-bottom: 10px;
}

</style>
