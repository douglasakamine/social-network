<template>
        <aside id="profileNav">
        <img id="profilePhoto" src="../assets/images/Azula.png" alt="avatar">
        <hr style="color:black">
        <div><h3>{{ name }}</h3></div>
        <div><p>{{ profileDescription }}</p></div>
        <div><p>Outras informacoes sobre mim</p></div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'name',
      'profileDescription'
    ])
  }

}
</script>

<style scoped>

#profileNav {
    border: solid 1px black;
    width: 200px;
    text-align: center;
    background-color: whitesmoke;
    position: fixed;
    top: 70px;
    left: 100px;
    box-shadow:  gray 2px 2px 1px;
}

#profilePhoto {
    width: 80%;
    margin: 5px;
    border: solid 1px;
    border-radius: 50%;

}
</style>
