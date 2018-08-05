<template lang="html">
  <section>
  <b-modal :active.sync="isLoginModalOpen" :onCancel="closeLoginModal" has-modal-card>
    <form>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ !isSignUp ? 'Login' : 'Sign Up' }}</p>
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
          <b-checkbox v-model="isSignUp">
            Make Sign Up
          </b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="closeLoginModal">Close</button>
          <button type="button" class="button is-primary" v-if="!isSignUp" @click="loginLocal">Login</button>
          <button type="button" class="button is-primary" v-else @click="signUpLocal">Sign Up</button>
        </footer>
      </div>
    </form>
    </b-modal>
  </section>
</template>

<script>
export default {
  props: {
    isLoginModalOpen: {
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
      isSignUp: true,
    }
  },
  methods: {
    loginLocal() {
      this.login(this.email, this.password)
    },
    signUpLocal() {
      this.signUp(this.email, this.password)
    },
  },
}
</script>

<style type="scss" scoped>
</style>