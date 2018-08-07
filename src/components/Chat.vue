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
        <p><b>Name:</b> {{ chatPartner ? chatPartner.name : 'N/A' }} </p>
        
        <div v-cloak>
          <button 
            class="button is-primary" 
            @click="joinChat" 
            :disabled="!currentUser"
            v-if="!isSearching ">Join Chat</button>
          <button 
            class="button is-info" 
            v-else 
            @click="addTime(120)">Add 2:00</button>
        </div>
      </div>

      <div class="vl"></div>
      <div class="chat column"> 
        <h3 class="title has-text-centered" v-if="isSearching">
          Waiting for partner {{ waitingDots }}
        </h3>
        <h3 class="title has-text-centered" v-else-if="!isSearching && !isChatStarted">
          Join Chat!
        </h3>
        
        <div v-if="isChatStarted">
          <!-- messages v-for  -->
          <ul>
            <li class="message" :key="message.id" v-for="message in messages">
              <div><b>{{ message.from }}</b> <span id="timeStamp">{{ message.sentTime }}</span></div>
              {{ message.text }}
            </li>
          </ul>
        </div>

        <b-field id="chatBox" v-if="isChatStarted">
          <b-input 
            @keyup.native.enter="addMessage"
            v-model="messageText" 
            id="chatInput" 
            size="is-medium" 
            placeholder="Message"></b-input>
        </b-field>

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
import firebase from 'firebase'
import moment from 'moment'

export default {
  props: {
    currentUser: {
      required: true,
    },
  },
  // created() {
  //   db.ref('chats').on('value').then(snapshot => {
  //     console.log('snap val: ', snapshot.val())
  //   })
  // },
  firebase: {
    chats: {
      source: db.ref('chats'),
    }
  },
  computed: {
    messages() {
      if (this.currentChatKey) {
        return this.chats.find(chat => chat['.key'] === this.currentChatKey).messages
      } else {
        return []
      }
    },
    currentUsersLength() {
      if (this.currentChatKey && this.chats) {
        return this.chats.find(chat => chat['.key'] === this.currentChatKey).users.length
      } else {
        return 0
      }
    },
    chatPartner() {
      if (this.currentUsersLength === 2) {
        return this.chats.find(
          chat => chat['.key'] === this.currentChatKey
        ).users.find(
          user => user.email !== this.currentUser.email
        )
      } else {
        return null
      }
    }
  },
  async beforeDestroy() {
    // Exit if just one person leaves
    // Destroy whole chat if two people leave
    const snap = await db.ref('chats').child(this.currentChatKey).once('value')
    console.log('currentChatKey: ', this.currentChatKey)
    const chat = snap.val()
    if (chat.users) {
      db.ref('chats').child(this.currentChatKey).child('messages').push({
        from: 'Admin',
        id: Date.now(),
        sentTime: moment().format('LT'),
        text: 'Chat partner has left!'
      })
      db.ref('chats').child(this.currentChatKey).set({
        messages: chat.messages
      })
    } else {
      console.log('One code running')
      db.ref('chats').child(this.currentChatKey).remove()
    }
  },
  data() {
    return {
      time: 600,
      isSearching: false,
      isChatStarted: false,
      isChatDone: false,
      waitingDots: '',
      currentChatKey: null,
      messageText: '',
    }
  },
  watch: {
    isChatStarted() {
      setTimeout(() => (this.isChatDone = true), this.time * 1000)
    },
    isSearching() {
      setInterval(() => {
        if (this.waitingDots.length < 3) {
          this.waitingDots += '.'
        } else {
          this.waitingDots = ''
        }
      }, 1000)
    },
    currentUsersLength() {
      if (this.currentUsersLength === 2) {
        this.$toast.open({
          type: 'is-success',
          message: 'Chat partner found!'
        })
        this.isChatStarted = true
        this.isSearching = false
      }
    }
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
    addMessage() {
      console.log('Adding message')
      db.ref('chats').child(this.currentChatKey).child('messages').push({
        from: this.currentUser.name,
        text: this.messageText,
        id: Date.now(),
        sentTime: moment().format('LT')
      })
      this.messageText = ''
    },
    joinChat() {
      this.isSearching = true
      if (this.chats.length === 0 || this.chats[this.chats.length - 1].users.length === 2) {
        // Create a new chat object in firebase chats array
        const postRef = db.ref('chats').push({
          users: [this.currentUser],
          messages: [{
            from: 'Admin',
            text: 'Welcome to the chat!'
          }]
        })
        // const chatsRef = db.ref('chats').child(postRef.key).child('messages').push([])
        this.currentChatKey = postRef.key
      } else {
        // Add current user to the last chat
        const chat = this.chats[this.chats.length-1]
        this.currentChatKey = chat['.key']
        const copy = Object.assign({}, chat)
        delete copy['.key']
        db.ref('chats').child(chat['.key']).set({
          users: chat.users.concat(
            this.currentUser
          ),
          messages: [{
            from: 'Admin',
            text: 'Welcome to the chat!',
            id: Date.now(),
            sentTime: moment().format('LT')
          }]
        })
      }
    },
  },
}
</script>

<style scoped>
#timeStamp {
  color: rgb(113, 112, 112);
}

li.message {
  margin: 15px;
}

input#chatInput {
  border-radius: 0px;
}

.chat.column {
  padding: 0px;
}

#chatBox {
  bottom: 0;
  width: 75%;
  position: fixed;
}

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