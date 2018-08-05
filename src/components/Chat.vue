<template>
  <section>
    <div class="columns">
      <div class="column is-one-quarter">
        <h2 class="title">Articles</h2>
        <ul>
          <li><a target="_blank" href="https://www.economist.com/news/finance-and-economics/21724802-two-studies-their-impact-seattle-reach-opposite-conclusions-economists-argue">Economist</a></li>
          <li><a target="_blank" href="http://articles.chicagotribune.com/2014-03-17/business/ct-biz-0317-work-advice-huppke-20140317_1_minimum-wage-income-inequality-increase">Chicago Tribune</a></li>
          <li><a target="_blank" href="https://www.dol.gov/whd/minwage/america.htm">The Department of Labor</a></li>
          <li><a target="_blank" href="https://ballotpedia.org/Minimum_wage_reports_and_analyses">Ballotpedia</a></li>
          <li><a target="_blank" href="https://minimum-wage.procon.org/">ProCon.org</a></li>
        </ul>

        <h2 class="title" id="chatPartner">Chat Partner</h2>
        <p><b>Name:</b> N/A </p>
        
        <div v-if="chatPartner">
          <button 
            class="button is-primary" 
            @click="joinChat" 
            :disabled="!currentUser"
            v-if="!isChatStarted ">Join Chat</button>
          <button 
            class="button is-info" 
            v-else 
            @click="addTime(120)">Add 2:00</button>
        </div>
      </div>

      <div class="vl"></div>
      <div class="column"> 
        <h3 class="title has-text-centered">
          {{ isChatStarted ? `Waiting for partner ${waitingDots}` : 'Join a chat!' }}
        </h3>

        <ul v-if="isChatDone">
          <li>How open was your chat mate to new ideas?</li>
          <b-input placeholder="Number"
            type="number"
            min="0"
            max="5">
          </b-input>

          <li>How well did your chat mate explain their point of view?</li>
          <b-input placeholder="Number"
            type="number"
            min="0"
            max="5">
          </b-input>

          <li>How open would you be to discussing with this chat mate again?</li>
          <b-input placeholder="Number"
            type="number"
            min="0"
            max="5">
          </b-input>
        <button class="button is-primary" @click="saveAnswers">Save answers</button>
        </ul>

      </div>
    </div>
  </section>
</template>

<script>
import { db } from '../utils/firebase'

export default {
  props: {
    currentUser: {
      required: true,
    },
  },
  firebase: {
    chats: db.ref('chats'), // make this watch on value change!
  },
  created() {
    db.ref('chats').on('value', snapshot => {
      console.log('snapshot: ', snapshot.val())
    })
  },
  data() {
    return {
      time: 15,
      isChatStarted: false,
      isChatDone: false,
      chatPartner: 'Richard',
      waitingDots: '',
    }
  },
  watch: {
    isChatStarted() {
      setInterval(() => {
        if (this.waitingDots.length < 3) {
          this.waitingDots += '.'
        } else {
          this.waitingDots = ''
        }
      }, 1000)
      setTimeout(() => (this.isChatDone = true), 150000)
    },
  },
  methods: {
    addTime(numOfSeconds) {
      this.time += numOfSeconds
    },
    saveAnswers() {
      this.$toast.open({
        message: 'Thanks for saving your answers',
        type: 'is-success',
      })
    },
    joinChat() {
      console.log('chats: ', this.chats)
      this.isChatStarted = true
      if (
        this.chats.length === 0 ||
        this.chats[this.chats.length - 1].length === 2 // might not work
      ) {
        this.$firebaseRefs.chats.push([this.currentUser.name])
      } else {
        const item = this.chats[this.chats.length - 1]
        const copy = Object.assign({}, item)
        delete copy['.key']
        this.$firebaseRefs.chats
          .child(item['.key'])
          .set(
            this.chats[this.chats.length - 1]['.value'].concat(
              this.currentUser.name
            )
          )
      }
    },
  },
}
</script>

<style scoped>
section {
  margin-top: 20px;
}

#chatPartner {
  margin-top: 20px;
}

#chatPartner > p {
  margin-bottom: 20px;
}

h2.title {
  margin-bottom: 10px;
}

.columns {
  padding: 2em;
  padding-top: 0px;
}

li {
  margin-top: 10px;
}

.vl {
  border-left: 2px solid black;
  height: 100vh;
  margin-top: -20px;
}

button {
  margin-top: 15px;
}
</style>