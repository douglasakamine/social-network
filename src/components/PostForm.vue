<template>
  <div class="post-form post">
    <form @submit.prevent="sendPost" name="post-text">
      <textarea form="post-text" id="post-text" cols="72" rows="5"
      placeholder=" Write something..."></textarea>
       <img v-if="uploadingImage === false" class="uploading"
       src="../assets/images/uploading.gif" alt="uploading" v-cloak>
      <img class="completed" v-if="uploadingImage == true" :src="image" alt="pre-post-image" v-cloak>
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
  data () {
    return {
      image: null,
      uploadingImage: null
    }
  },
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
      this.uploadingImage = null
    },
    async uploadImageFromForm () {
      this.uploadingImage = false
      var fileURL = await this.uploadFile(event.target.files[0])
      this.$store.dispatch('uploadFilePost', fileURL)
      this.uploadingImage = true
      this.image = fileURL
    }
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.post {
    text-align: center;
    width: 580px;
    margin-top: 70px;
    margin-left: 320px;
    padding: 10px;
    border: none;
    text-align: center;
    background-color: white;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    border-radius: 1em;
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
.completed {
   width: 100%;
}
.uploading {
  width: 30px;
}
</style>
