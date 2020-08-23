<template>
  <div id="app">

  <Header />

  <router-view></router-view>

  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
    background-color: #e5e3e3;
    width: 100%;
    font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
    font-size: 13px;
    margin: 0;
    padding: 0;
}
</style>
