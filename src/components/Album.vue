<template>
    <section>
         <div class="profile-body">
      <div class="photo-album">
      <div class="photo" v-for="photo in albumPhotos" :key="photo.id">
        <img :src="photo" alt="photo">
      </div>
     </div>
    </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      albumPhotos: 'getAlbumPhotos'
    })
  }
}
</script>

<style scoped>
.profile-body {
  margin: 5px auto auto auto;
  border-radius: 1em;
  background-color: whitesmoke;
  padding: 5px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
.photo-album {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 1em;
}
.photo {
  margin: 5px;
  width: 250px;
  height: 300px;
  cursor: pointer;
}
.photo img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
