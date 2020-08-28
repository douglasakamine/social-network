<template>
        <aside id="profileNav">
        <img id="profilePhoto" src="../assets/images/douglas.jpeg" alt="avatar">
        <hr style="color:black">
        <div><h3>{{ name }}</h3></div>
        <div><p>{{ profileDescription1 }}</p></div>
        <div><p>{{ profileDescription2 }}</p></div>
        <div><p><strong>{{ countFriends }}</strong> Friends</p></div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'name',
      'profileDescription1',
      'profileDescription2',
      'countFriends'
    ])
  }

}
</script>

<style scoped>

#profileNav {
    border: none;
    width: 200px;
    text-align: center;
    background-color: whitesmoke;
    position: fixed;
    top: 70px;
    left: 100px;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);
}

#profilePhoto {
    width: 80%;
    margin: 5px;
    border: none;
    border-radius: 50%;
    box-shadow:  0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2);

}
</style>
