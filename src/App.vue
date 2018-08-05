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
import firebase from 'firebase'
import Navbar from './components/Navbar.vue'
import { db } from './utils/firebase'

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
      return this.currentUser ? true : false
    },
  },
  methods: {
    closeLoginModal() {
      this.isLoginModalOpen = false
    },
    openLoginModal() {
      this.isLoginModalOpen = true
    },
    login(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.$toast.open({
            type: 'is-success',
            message: 'Logged in!',
          })
          this.isLoginModalOpen = false
          this.currentUser = this.users.find(user => user.email == email)
        })
        .catch(error => {
          // Handle Errors here.
          this.$toast.open({
            type: 'is-danger',
            message: `Error: ${error.message}`,
          })
        })
    },
    logout() {
      this.loggedInUsers = this.loggedInUsers.filter(
        user => user.email !== this.currentUser.email
      )
      this.$firebaseRefs.loggedInUsers.child(this.currentUser['.key']).remove()
      this.currentUser = null
    },
    async signUp({ email, password, firstName }) {
      if (this.users.find(user => user.email == email)) {
        return this.$toast.open({
          type: 'is-danger',
          message: 'The e-mail has already been taken!',
        })
      }
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        this.$firebaseRefs.users.push({
          email,
          firstName,
        })
        this.currentUser = this.users.find(user => user.email === email)
        this.isLoginModalOpen = false
        this.$router.push('/setPreferences')
      } catch (error) {
        this.$toast.open({
          type: 'is-danger',
          message: `Error: ${error.message}`,
        })
        console.log('error: ', error)
      }
    },
  },
}
</script>

<style>
</style>
