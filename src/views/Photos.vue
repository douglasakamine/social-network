<template>
    <div class="photos">
      <Header />
      <input id="input-upload-album" @change="uploadAlbum()" type="file" style="display: none" ref="uploadAlbum">
          <div class="photos-body" v-if="userProfile">
            <div class="upload-button-box">
            <button class="upload-photo" @click="$refs.uploadAlbum.click()">
              <i class="fas fa-cloud-upload-alt"> Upload photo</i>
            </button>
            </div>
            <div class="div-photos" v-for="(photos, index) in myProfilePhotos.album" :key="photos.id">
              <div class="delete-button-box" v-show="myProfilePhotos.deleteHover[index]"
              @click="deletePhoto(index, photos)" @mouseover="showDelete(index)">
              <i class="far fa-trash-alt"></i>
              </div>
                <img @mouseover="showDelete(index)" @mouseleave="hideDelete(index)"
                :src="photos" alt="photo" @click="openPhoto(index)">
            </div>
         </div>
         <div class="photos-body" v-else>
            <div class="div-photos" v-for="(photos, index) in friendsPhotos.album" :key="photos.id">
                <img :src="photos" alt="photo" @click="openPhoto(index)">
            </div>
          </div>
          <div v-if="buttonAlbumStatus" class="slideshow-container">
        <div class="close-button-box"><i @click="closePhoto" class="far fa-window-close fa-3x" style="color: white"></i></div>
       <div class="my-user-photo-clicked" v-if="userProfile" >
       <div class="fade">
    <img :src="myProfilePhotos.album[clickedPhoto]">
      </div>
        <a class="prev" @click="plusSlides(-1, 'myProfile')">&#10094;</a>
      <a class="next" @click="plusSlides(1, 'myProfile')">&#10095;</a>
      </div>
      <div v-else class="friend-user-photo-clicked">
      <div class="fade">
    <img :src="friendsPhotos.album[clickedPhoto]">
      </div>
     <a class="prev" @click="plusSlides(-1, 'friendProfile')">&#10094;</a>
      <a class="next" @click="plusSlides(1, 'friendProfile')">&#10095;</a>
      </div>
</div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import { auth, dbUsers } from '../main'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import Utils from '../mixins/UtilsMixin'

export default {
  data () {
    return {
      userProfile: null
    }
  },
  computed: {
    ...mapGetters({
      friendsPhotos: 'getFriendProfile',
      myProfilePhotos: 'getProfileInfo',
      buttonAlbumStatus: 'getButtonAlbum',
      clickedPhoto: 'getClickedPhoto'
    })
  },
  components: {
    Header
  },
  methods: {
    openPhoto (index) {
      this.$store.dispatch('setClickedPhoto', index)
      this.$store.dispatch('setButtonAlbum', true)
    },
    showDelete (index) {
      this.$store.dispatch('setDeleteButtonOnPhotos', { value: true, photoIndex: index })
    },
    hideDelete (index) {
      this.$store.dispatch('setDeleteButtonOnPhotos', { value: false, photoIndex: index })
    },
    deletePhoto (index, photo) {
      if (confirm('Are you sure to delete this photo?')) {
        dbUsers.doc(this.$store.state.profile.username)
          .update({
            album: firebase.firestore.FieldValue.arrayRemove(photo)
          })
        this.myProfilePhotos.album.splice(index, 1)
      }
    },
    plusSlides (num, whichUser) {
      var nextPhoto = this.clickedPhoto + num
      if (whichUser === 'myProfile') {
        if (nextPhoto >= this.myProfilePhotos.album.length) {
          nextPhoto = 0
        } else if (nextPhoto <= -1) {
          nextPhoto = this.myProfilePhotos.album.length - 1
        }
        this.$store.dispatch('setClickedPhoto', nextPhoto)
      } else {
        if (nextPhoto >= this.friendsPhotos.album.length) {
          nextPhoto = 0
        } else if (nextPhoto <= -1) {
          nextPhoto = this.friendsPhotos.album.length - 1
        }
        this.$store.dispatch('setClickedPhoto', nextPhoto)
      }
    },
    closePhoto () {
      this.$store.dispatch('setButtonAlbum', false)
    },
    async uploadAlbum () {
      var fileURL = await this.uploadFile(event.target.files[0])
      dbUsers.doc(this.$store.state.profile.username)
        .update({
          album: firebase.firestore.FieldValue.arrayUnion(fileURL)
        })
      this.$store.dispatch('addPhotoToAlbum', fileURL)
    }
  },
  async created () {
    var user = auth.currentUser
    if (user) {
      if (this.$route.params.id === user.displayName) {
        await dbUsers.doc(user.displayName).get().then(doc => {
          var data = doc.data()
          data.deleteHover = []
          data.album.forEach((photo, index) => {
            data.deleteHover[index] = false
          })
          this.$store.dispatch('setProfileInfo', data)
          this.userProfile = true
        })
      } else {
        await dbUsers.doc(this.$route.params.id).get().then(doc => {
          this.$store.dispatch('setFriendProfile', doc.data())
          this.userProfile = false
        })
      }
    }
  },
  mixins: [Utils]
}
</script>

<style scoped>
.photos-body {
    width: 900px;
    margin: 70px auto auto auto;
    display: flex;
    flex-wrap: wrap;
}
.upload-button-box {
  padding: 5px;
  margin: 5px;
  width: 100%;
}
.upload-photo {
  border-radius: .5em;
  outline: none;
  border: none;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  cursor: pointer;
  height: 25px;
}
.div-photos {
    width: 250px;
    padding: 5px;
    margin: 5px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
}
.div-photos img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: .6em;
}
.fa-trash-alt {
  font-size: 20px;
  color: white;
    width: auto;
  padding: 12px;
}
.delete-button-box {
  position: absolute;
  right: 10px;
  top: 10px;
  display: inline-block;
  background-color: rgba(0,0,0,0.8);
  border-radius: .6em;
  cursor: pointer;

}
/* Slideshow container */
.slideshow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  margin: auto;
  background: #000;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* Position the "next button" to the right */
.prev {
  left: 0;
  border-radius: 3px 0 0 3px;
}
.fa-window-close {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover, .fa-window-close:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
  margin: auto;
  width: 600px;
}
.fade img {
    width:100%;
    object-fit: cover;
    min-height: 100%
}
.close-button-box {
    text-align: end;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

</style>
