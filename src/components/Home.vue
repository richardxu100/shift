<template>
  <section class="hero is-fullheight is-primary is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          <span>Battle Political Polarization</span> 
        </h1>
        <h2 class="subtitle">
          <button class="button is-info" @click="$router.push('/chat')">Join a Conversation</button>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}  
</script>

<style lang="scss" scoped>
  h1.title {
    margin-bottom: 2.5rem;
  }
</style>