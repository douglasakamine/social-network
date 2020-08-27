<template>
    <section class="post-form post">
                <form @submit.prevent="Submit">
                <textarea v-model="formData.content" name="post-text" id="post-text" cols="30" rows="10"
                placeholder="Type something..."></textarea>
                <div>
                <input type="file" name="post-photo" id="post-photo">
                <button class="button-post" type="submit">Publicar Post</button>
            </div>
            </form>
    </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      formData: {
        id: '9',
        name: 'Douglas Post',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'addPost'
    ]),
    Submit () {
      const { id, name, content } = this.formData

      console.log(this.formData)
      const values = { id, name, content }

      this.addPost(values)
    }
  }
}
</script>

<style scoped>

.post {
    text-align: center;
    width: 578px;
    margin-top: 70px;
    margin-left: 320px;
    padding: 10px;
    border: none;
    text-align: center;
    background-color: whitesmoke;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}

#post-text {
    width: 80%;
    border: none;
    outline: none;
}

.button-post {
    background-color: darkblue;
    border-radius: 1em;
    color: white;
    font-size: 15px;
    font-weight: bold;
}
</style>
