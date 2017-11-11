<template lang="html">
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
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <button class="button is-primary" @click="isLoginOpen = true">Login</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
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
    login: {
      type: Function,
      required: true,
    },
    signUp: {
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

</style>
