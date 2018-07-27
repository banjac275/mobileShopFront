<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    'app-header': Header
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 5px;
  height: calc(100vh - 6px);
}
</style>
