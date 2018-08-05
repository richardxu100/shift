<template>
  <section class="section">
    <div class="container" v-if="arePreferencesSet">
      <h1 class="title">Your preferences have been set.</h1>
    </div>
    <div class="container" v-else>
      <h1 class="title">Answer these questions!</h1>
      <ol>
        <li>What would you identify yourself as politically?</li>
        <b-radio v-model="ideology" native-value="Conservative">
          Conservative
        </b-radio>
        <b-radio v-model="ideology" native-value="Liberal">
          Liberal
        </b-radio>
        <b-radio v-model="ideology" native-value="Independent">
          Independent
        </b-radio>

        <li>I support legislation that reduces the supply of firearms</li>

        <b-input placeholder="Number"
          type="number"
          min="0"
          v-model="guns"
          max="5">
        </b-input>

        <li>I support increasing the availability on abortions</li>

        <b-input placeholder="Number"
          type="number"
          min="0"
          v-model="abortions"
          max="5">
        </b-input>

        <li>Fake news within the media isn't prevalent and dangerous.</li>

        <b-input placeholder="Number"
          type="number"
          min="0"
          v-model="fakeNews"
          max="5">
        </b-input>

        <li>I support teaching evolution in public schooling.</li>

        <b-input placeholder="Number"
          type="number"
          min="0"
          v-model="evolution"
          max="5">
        </b-input>

        <li>I believe that climate change is a serious issue for our country.</li>

        <b-input placeholder="Number"
          type="number"
          min="0"
          v-model="climateChange"
          max="5">
        </b-input>
      
      </ol>
      <button class="button is-primary" @click="arePreferencesSet = true">Set Preferences</button>
    </div>
  </section>
</template>

<script>
import { db } from '../utils/firebase'

export default {
  data() {
    return {
      ideology: '',
      abortions: 0,
      guns: 0,
      climateChange: 0,
      evolution: 0,
      fakeNews: 0,
      arePreferencesSet: false,
    }
  },
  // firebase: {
  //   : db.ref('users'),
  // },
  methods: {
    // setPreferences() {
    //   db.ref('currentUser')
    // }
  },
}
</script>

<style scoped lang="scss">
li {
  margin-top: 10px;
}

button {
  margin-top: 10px;
}
</style>