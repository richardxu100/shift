<template>
  <div id="app">
    <app-navbar
      :login="login"
      :sign-up="signUp">    
    </app-navbar>  
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
  },
  data() {
    return {
      currentUser: null,
    }
  },
  methods: {
    login(email, password) {
      this.currentUser = this.firebase.users.find(user => user.email == email && user.password == password
      );  
    },
    signUp(email, password) {
      this.$firebaseRefs.users.push({
        email,
        password,
      });
    }
  }
}
</script>

<style lang="scss">

</style>
