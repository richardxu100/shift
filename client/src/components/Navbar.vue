<template lang="html">
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <b>SHIFT</b>
        </router-link>
        <div class="navbar-burger burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" href="/documentation/overview/start/">
                Menu
              </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" href="/documentation/overview/start/">
                  Leaderboard
                </a>
                <a class="navbar-item" href="/documentation/overview/start/">
                  Article Breakdowns
                </a>
              <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                  About
                </a>
            </div>
          </div>
        </div>
        
        <!-- <div class="navbar-middle">
          <b>Today's Topic: Minimum Wage Laws</b>
        </div> -->

        <div class="navbar-end">
          <div class="navbar-item" v-if="!isLoggedIn">
            <div class="field is-grouped">
              <button class="button is-primary" @click="openLoginModal">Login</button>
            </div>
          </div>

          <div class="navbar-item has-dropdown is-hoverable" v-else>
            <a class="navbar-link" href="/documentation/overview/start/">
                Account
              </a>
            <div class="navbar-dropdown is-right">
              <a class="navbar-item" href="/documentation/overview/start/">
                Set Preferences
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                Logout
              </a>
            </div>
          </div>

        </div>
      </div>
    </nav>
    <app-login 
      :login="login"
      :sign-up="signUp"
      :email="email"
      :password="password"
      :is-login-modal-open="isLoginModalOpen"
      :close-login-modal="closeLoginModal">    
    </app-login>
  </div>
</template>

<script>
import Login from './Login.vue';

export default {
  components: {
    'app-login': Login,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    isLoginModalOpen: {
      type: Boolean,
      required: true,
    },
    login: {
      type: Function,
      required: true,
    },
    signUp: {
      type: Function,
      required: true,
    },
    logout: {
      type: Function,
      required: true,
    },
    closeLoginModal: {
      type: Function,
      required: true,
    },
    openLoginModal: {
      type: Function,
      required: true,
    }
  },
}
</script>

<style lang="scss">
// .navbar-middle {
//   display: flex;
//   align-items: center;
// }
</style>
