<template>
  <div id="app">
    <app-navbar
      :login="login"
      :sign-up="signUp"
      :is-logged-in="isLoggedIn"
      :close-login-modal="closeLoginModal"
      :open-login-modal="openLoginModal"
      :is-login-modal-open="isLoginModalOpen"
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
    users: db.ref('users'),
    loggedInUsers: db.ref('loggedInUsers'),
  },
  data() {
    return {
      currentUser: null,
      isLoginModalOpen: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.currentUser ? true : false;
    }
  },   
  methods: {
    closeLoginModal() {
      this.isLoginModalOpen = false;
    },
    openLoginModal() {
      this.isLoginModalOpen = true;
    },
    login(email, password) {
      if (!this.users.find(user => user.email == email)) {
        return alert('A user with that e-mail wasnt found');
      }

      if (!this.loggedInUsers.find(user => user.email == email)) { // this doesn't really work
        this.$firebaseRefs.loggedInUsers.push({ email });
      }

      this.isLoginModalOpen = false;
      
      this.currentUser = this.users.find(
        user => user.email == email && user.password == password
      );
    },
    logout() {
      this.loggedInUsers = 
        this.loggedInUsers.filter(user => user.email !== this.currentUser.email);

      this.$firebaseRefs.loggedInUsers
        .child(this.currentUser['.key']).remove();

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
      this.login(email, password);
      this.$router.push('/setPreferences');
    }
  }
}
</script>

<style lang="scss">

</style>
