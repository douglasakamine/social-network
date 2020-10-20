<template>
  <aside id="sidebar" v-if="ads" v-cloak>
    <div v-for="(ad) in ads" :key="ad.id">
    <img id="ads" :src="ad.adsImage" alt="Ads Image">
      <div><h2>Advertising here</h2></div>
      <div><p>{{ ad.adsDescription }}</p></div>
            <footer>
                <p>Social Network Corporation © 2020</p>
                <p>Project Developed by Douglas Akamine</p>
            </footer>
        </div>
        </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../main'

export default {
  computed: {
    ...mapGetters({
      ads: 'getAds'
    })
  },
  created () {
    db.collection('ads').get().then(snapshot => {
      snapshot.forEach(doc => {
        this.$store.dispatch('setAdsToState', doc.data())
      })
    })
  }
}
</script>

<style scoped>
#sidebar {
    /* border: solid 1px black; */
    border: none;
    width: 250px;
    text-align: center;
    background-color: whitesmoke;
    position: fixed;
    top: 70px;
    left: 940px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}

#ads {
    width: 80%;
    margin: 5px;
    border: solid 1px;
}

footer {
    position: relative;
    top: 70px;
}

</style>
