<template>
  <div id="app">
    <app-navbar></app-navbar>  
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  components: {
    'app-navbar': Navbar,
  },
  // data() {
    
  // },
}
</script>

<style lang="scss">

</style>
