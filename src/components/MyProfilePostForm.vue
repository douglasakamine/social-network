<template>
  <div class="post-form post">
    <form @submit.prevent="sendPost" name="post-text">
      <textarea form="post-text" id="post-text" cols="72" rows="5"
      placeholder=" Write something..."></textarea>
        <div id="post-buttons">
          <button type="button" class="button-file-post" @click="$refs.inputFilePost.click()">
            <i class="far fa-image"></i></button>
          <input @change="uploadImageFromForm" id="input-file-post" type="file"
          ref="inputFilePost" style="display: none">
          <button class="button-post" type="submit">Send Post</button>
        </div>
    </form>
  </div>
</template>

<script>
import Utils from '../mixins/UtilsMixin'

export default {
  mixins: [Utils],
  methods: {
    getDate () {
      const date = new Date()
      return date.getTime()
    },
    sendPost () {
      var post = {
        photo: this.$store.state.profile.photo,
        date: this.getDate(),
        name: this.$store.state.profile.name,
        username: this.$store.state.profile.username,
        content: event.target.children[0].value.replace(/\n\r?/g, '<br />'),
        file: this.$store.state.currentImageLink,
        likes: [],
        likeBox: false
      }
      this.$store.dispatch('addPost', post)
      event.target.children[0].value = null
    },
    async uploadImageFromForm () {
      var fileURL = await this.uploadFile(event.target.files[0])
      this.$store.dispatch('uploadFilePost', fileURL)
    }
  }
}
</script>

<style scoped>

.post {
    text-align: center;
    width: 490px;
    margin: 23px 5px 0 0;
    padding: 10px;
    border: none;
    text-align: center;
    background-color: white;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    border-radius: 1em;
    float: right;
}

#post-text {
    width: 100%;
    border: none;
    outline: none;
    white-space: pre-wrap;
    resize: none;
    background-color: whitesmoke;
    border-radius: .6em;
}

button {
    color: white;
    font-size: 15px;
    border: none;
    background-color: #008CBA;
    font-size: 16px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    margin: 4px;
    border-radius: .2em;
    cursor: pointer;
}
.button-file-post {
    background-color: #4CAF50;
}

.upload-box {
    position: absolute;
    top: 250px;
    right: 50%;
    margin: auto;
    border: solid 1px grey;
}
</style>
