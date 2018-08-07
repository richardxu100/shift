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
    <router-view :current-user="currentUser"></router-view>
    <button @click="setDifferentUser" class="button is-success">Set Diff User</button>
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
      currentUser: {
        name: 'John Doe',
        email: 'test41@test.com',
      },
      // currentUser: {
      //   name: 'rich2',
      //   email: 'test51@test.com',
      // },
      isLoginModalOpen: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.currentUser ? true : false
    },
  },
  methods: {
    // Testing purposes (new user for chat)
    setDifferentUser() {
      this.currentUser = {
        name: 'Rich Xu',
        email: 'test123@test.com'
      }
    },
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
    async signUp({ email, password, name }) {
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
          name,
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
