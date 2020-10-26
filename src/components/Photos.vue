<template>
<div class="slideshow-container">
    <div class="close-button-box"><i @click="closePhoto" class="far fa-window-close fa-3x" style="color: white"></i></div>
  <div class="fade">
    <img :src="albumPhotos[clickedPhoto]">
  </div>
  <a class="prev" @click="plusSlides(-1)">&#10094;</a>
  <a class="next" @click="plusSlides(1)">&#10095;</a>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      clickedPhoto: 'getClickedPhoto',
      albumPhotos: 'getAlbumPhotos'
    })
  },
  methods: {
    plusSlides (num) {
      var nextPhoto = this.clickedPhoto + num
      if (nextPhoto >= this.albumPhotos.length) {
        nextPhoto = 0
      } else if (nextPhoto <= -1) {
        nextPhoto = this.albumPhotos.length - 1
      }
      this.$store.dispatch('setClickedPhoto', nextPhoto)
    },
    closePhoto () {
      this.$store.dispatch('setButtonAlbum', false)
    }
  }
}
</script>

<style scoped>
* {box-sizing:border-box}

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
  display: table;
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
  display: inline-block;
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
