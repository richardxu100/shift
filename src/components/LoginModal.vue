<template lang="html">
  <section>
  <b-modal :active="isLoginModalOpen" :onCancel="closeLoginModal" has-modal-card>
    <form>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ !isSignUp ? 'Login' : 'Sign Up' }}</p>
        </header>
        <section class="modal-card-body">
          <b-field label="First Name" v-if="isSignUp">
            <b-input type="text" v-model="firstName" placeholder="First Name" required>
            </b-input>
          </b-field>
          <b-field label="Email">
            <b-input type="email" v-model="email" placeholder="Email" required>
            </b-input>
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="password" password-reveal placeholder="Password" required>
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
  },
  data() {
    return {
      isSignUp: true,
      firstName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    loginLocal() {
      this.login(this.email, this.password)
    },
    signUpLocal() {
      this.signUp({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
      })
    },
  },
}
</script>

<style type="scss" scoped>
</style>