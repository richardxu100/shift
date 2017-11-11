<template>
  <div id="app">
    <app-navbar
      :login="login"
      :sign-up="signUp"
      :is-logged-in="isLoggedIn"
      :logout="logout">    
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
  computed: {
    isLoggedIn() {
      return this.currentUser ? true : false;
    }
  },   
  methods: {
    login(email, password) {
      this.currentUser = this.users.find(user => user.email == email && user.password == password
      );
    },
    logout() {
      this.currentUser = null;
    },
    signUp(email, password) {
      if (this.users.find(user => user.email == email)) {
        return alert('The e-mail has already been taken!');
      }
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
