<template>
  <div id="app">
    <app-navbar></app-navbar>  
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { db } from './utils/firebase';

export default {
  name: 'app',
  components: {
    'app-navbar': Navbar,
  },
  firebase: {
    users: db.ref('users')
  }
}
</script>

<style lang="scss">

</style>
