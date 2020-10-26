<template>
 <div id="my-feed">
            <div class="post" v-for="(post, index) in posts" :key="post.id">
              <i @click="deletePost(post.id, index)" title="Delete post" v-if="post.username === user" class="fas fa-times"></i>
              <div class="post-header">
              <img id="photo" :src="post.photo">
                <h3><router-link :to="'/profile/' + post.username">{{ post.name }}</router-link></h3>
                <div class="post-date">{{ post.date | moment("from", "now") }}</div>
                </div>
                <div class="post-content"><span v-html="post.content"></span></div>
                <img id="postImage" :src="post.file">
                <hr>
                <div class="like-box">
                  <a class="like-button" @click="like(post.id, index, post.likes)"><i class="far fa-thumbs-up fa-2x">
                  </i><strong>{{ likeDescription(post.likes) }}</strong></a>
                 <a @click="toggleListLiked(post.likeBox, index)" class="likes"><strong>{{ post.likes.length }} Likes</strong></a>
                 <div class="likes-list" v-if="post.likeBox">
                   <p v-for="like in post.likes" :key="like.id">
                     <router-link :to="'/profile/' + like">{{ like }}
                     </router-link></p></div>
                </div>
            </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Utils from '../mixins/UtilsMixin'
import { dbPosts } from '../main'
import firebase from 'firebase'

export default {
  data () {
    return {
      user: this.$store.state.profile.username
    }
  },
  computed: {
    ...mapGetters({
      posts: 'getFeed'
    })
  },
  methods: {
    like (id, index, array) {
      if (array.includes(this.$store.state.profile.username)) {
        dbPosts.doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(this.$store.state.profile.username)
          })
        this.$store.dispatch('removeLikes', index)
        console.log('LIKE')
      } else {
        dbPosts.doc(id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.$store.state.profile.username)
          })
        this.$store.dispatch('updateLikes', index)
      }
    },
    likeDescription (array) {
      if (array.includes(this.$store.state.profile.username)) {
        return 'Dislike'
      } else {
        return 'Like'
      }
    },
    toggleListLiked (likebox, index) {
      if (likebox) {
        this.$store.dispatch('toggleLikeBox', { index: index, bool: false })
      } else {
        this.$store.dispatch('toggleLikeBox', { index: index, bool: true })
      }
    },
    deletePost (id, index) {
      dbPosts.doc(id).delete().then(() => {
        console.log('Document successfully deleted!')
        this.$store.dispatch('removePost', index)
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  },
  mixins: [Utils]
}
</script>

<style scoped>
#my-feed {
    text-align: center;
    width: 510px;
    margin: 20px 5px 0 0;
    float: right;
}
.post {
    border: none;
    text-align: center;
    background-color: whitesmoke;
    padding: 10px 0px 1px 0px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
    margin-bottom: 10px;
    border-radius: 1em;
}

.post-header {
  display: flex;
  align-content: center;
  align-items: center;
  margin: 10px 20px 10px 20px;
}

#postImage {
  width: 100%;
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
.like-box {
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: flex-start;
  position: relative;
}
.like-button {
  cursor: pointer;
}
.likes {
  margin: 10px auto auto 15px;
  text-decoration: underline;
  color: steelblue;
  cursor: pointer;
}
.likes-list {
  padding: 5px;
  background-color: white;
  position: absolute;
  top: 33px;
  left: 65px;
  font-weight: bold;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}
.fa-times {
  float: right;
  margin: 1px 10px 1px 1px;
  font-size: 18px;
  cursor: pointer;
}

</style>
