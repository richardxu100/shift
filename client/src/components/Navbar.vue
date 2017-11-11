<template lang="html">
  <div>
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <b>SHIFT</b>
        </a>
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
              <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                  About
                </a>
            </div>
          </div>
        </div>
        
        <div class="navbar-middle">
          <b>Today's Topic: Automation!</b>
        </div>

        <div class="navbar-end">
          <div class="navbar-item" v-if="!isLoggedIn">
            <div class="field is-grouped">
              <button class="button is-primary" @click="isLoginOpen = true">Login</button>
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
      :is-login-open="isLoginOpen"
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
      isLoginOpen: false,
      email: '',
      password: '',
    }
  },
  props: {
    isLoggedIn: {
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
  },
  methods: {
    closeLoginModal() {
      this.isLoginOpen = false;
    },
  },
}
</script>

<style lang="scss">
.navbar-middle {
  display: flex;
  align-items: center;
}
</style>
