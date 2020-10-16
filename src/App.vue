<template>
  <div id="app" v-cloak>

  <router-view></router-view>

  </div>
</template>

<script>
import { auth } from './main'
import Utils from './mixins/UtilsMixin'

export default {
  name: 'App',
  components: {
  },
  beforeCreate () {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('LOGADO')
      } else {
        console.log('DESLOGADO')
        this.resetState()
      }
    })
  },
  mixins: [Utils]
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

body {
    background-color: #e5e3e3;
    width: 100%;
    font-family: 'Open Sans', sans-serif, Verdana, Tahoma;
    font-size: 13px;
    margin: 0;
    padding: 0;
}

[v-cloak] {
  display: none;
}
</style>
