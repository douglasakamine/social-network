<template>
<div class="friends-page">
  <Header />
    <ul class="friends">
    <li class="friend" v-for="friend in friends" :key="friend.id">
      <span class="friendPhoto"><img :src="friend.photo" alt="friend photo"></span>
      <span class="friendName"><router-link :to="'/profile/' + friend.username">{{ friend.name }}</router-link></span>
      <button @click.prevent="toggleButton" class="btn">{{ friend.isFriend }}</button>
    </li>
    </ul>
</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import { mapGetters, mapActions } from 'vuex'
import Utils from '@/mixins/UtilsMixin'

export default {
  components: {
    Header
  },
  data () {
    return {
      buttonText: 'Add'
    }
  },
  computed: {
    ...mapGetters({
      friends: 'getFriends'
    })
  },
  methods: {
    ...mapActions([
      'addFriend'
    ]),
    toggleButton () {
      // if (this.buttonText === 'Add') {
      //   this.buttonText = 'Remove'
      // } else {
      //   this.buttonText = 'add'
      // }
      this.buttonText = 'remove'
    }
  },
  beforeMount () {
    this.getFriendsList()
  },
  destroyed () {
    this.$store.state.friends = []
  },
  mixins: [Utils]
}
</script>

<style scoped>

.friends-page {
  width: auto;
}

.friends {
    text-align: center;
    width: 900px;
    margin-top: 70px;
    padding: 0;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    flex-wrap: wrap;
}

.friend {
   margin: 10px;
   padding: 10px;
   border: none;
   background-color: whitesmoke;
   box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 380px;
   height: 80px;
   border-radius: 1em;
}

.btn {
  flex-grow: 1;
  top: 50%;
  margin-top: -10px;
  width: 40px;
  height: 30px;
  font-weight: bold;
  border: none;
  color: white;
  background-color: blue;
  font-size: 16px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
}

.friendPhoto img {
  width: 70px;
  height: 80px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
  flex-grow: 2;
  cursor: pointer;
}

.friendName {
  flex-grow: 3;
  text-align: left;
  padding-left: 15px;
  position: relative;
}

.friendName a {
  text-align: left;
  padding-left: 5px;
  position: absolute;
  top: 50%;
  margin-top: -10px;
  font-size: 110%;
  text-decoration: none;
  font-weight: bold;
  color: black;
}

</style>
