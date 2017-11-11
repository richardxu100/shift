<template lang="html">
  <section>
    <form action="">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input type="email" v-model="email" placeholder="Your email" required>
            </b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="password" password-reveal placeholder="Your password" required>
            </b-input>
          </b-field>
          <b-checkbox>{{ isLogin ? 'Make Signup' : 'Make Login' }}</b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeLoginModal">Close</button>
          <button class="button is-primary" v-if="isLogin" @click="loginLocal">Login</button>
          <button class="button is-primary" v-else @click="signUpLocal">Sign Up</button>
        </footer>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    isLoginOpen: {
      type: Boolean,
      required: true,
    },
    closeLoginModal: {
      type: Function,
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
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLogin: true,
    }
  },
  methods: {
    loginLocal() {
      this.login(this.email, this.password);
    },
    signUpLocal() {
      this.signUp(this.email, this.password);
    },
  }
}
</script>

<style type="scss" scoped>
  
</style>