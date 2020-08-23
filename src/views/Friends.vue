<template>
<section class="friends-page">
    <ul class="friends">
    <li class="friend" v-for="friend in friends" :key="friend.id">
      <span class="friendPhoto"><img src="../assets/images/Azula.png" alt="friend photo"></span>
      <span class="friendName"><a href="">{{ friend.name }}</a></span>
      <button class="btn">Add</button>
    </li>
    </ul>
</section>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      friends: 'getFriends'
    })
  }
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
   border: black 1px solid;
   background-color: whitesmoke;
   box-shadow:  gray 2px 2px 1px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 380px;
   height: 80px;
   border-radius: .5em;
}

.btn {
  flex-grow: 1;
  top: 50%;
  margin-top: -10px;
  width: 40px;
  height: 30px;
  border-radius: .2em;
  border: solid black 1px;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
}

.friendPhoto img {
  width: 70px;
  height: 80px;
  border-radius: 60%;
  border: black solid 1px;
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
