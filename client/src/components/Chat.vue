<template>
  <section>
    <div class="columns">
      <div class="column is-one-quarter">
        <h2 class="title">Articles</h2>
        <ul>
          <li><a href="google.com">Google</a></li>
          <li><a href="google.com">Google</a></li>
          <li><a href="google.com">Google</a></li>
          <li><a href="google.com">Google</a></li>
          <li><a href="google.com">Google</a></li>
        </ul>


        <h2 class="title" id="chatPartner">Chat Partner</h2>
        <p><b>Name:</b> {{ !chatPartner ? 'loading' : chatPartner.name }} </p>
        
        <div v-if="chatPartner">
          <button class="button is-primary" @click="isChatStarted = true" v-if="!isChatStarted ">Start Chat</button>

          <button class="button is-info" v-else @click="addTime(120)">Add 2:00</button>
        </div>
      </div>

      <div class="vl"></div>
      <div class="column"> 
        <h3 class="title has-text-centered">Timer: {{ time }} seconds</h3>

        <p class="has-text-centered">Go to this link: <a target="_blank" href="http://stin.to/3u8w8" v-if="isChatStarted">http://stin.to/3u8w8</a>!
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      time: 360,
      isChatStarted: false,
      chatPartner: null,
    }
  },
  watch: {
    isChatStarted() {
      setInterval(() => this.time = this.time - 1, 1000);
    }
  },
  methods: {
    addTime(numOfSeconds) {
      this.time += numOfSeconds;
    }
  }
}  
</script>

<style lang="scss" scoped>
  #chatPartner {
    margin-top: 20px;

    p {
      margin-bottom: 20px;
    }
  }

  h2.title {
    margin-bottom: 10px;
  }

  .columns {
    padding: 2em;
    // padding-top: 0px;
  }

  li {
    margin-top: 10px;
  }

  // input {
  //   position: fixed !important;
  //   width: 100%;
  //   bottom: 0;
  // }

  .vl {
    border-left: 2px solid black;
    height: 100vh;
    margin-top: -20px;
  }

  button {
    margin-top: 15px;
  }
</style>