<template>
    <div class="chat-box">
        <div class="box-messaging" ref="boxMessaging">
                <div v-for="message in chat" :key="message.id" :class="getMessageUserClass(message.from)">
                    <div class="name-in-message">{{ message.name }} <span>says...</span></div>
                    <div class="message-content" v-html="message.content"></div>
                    <div class="time">{{ message.time | moment("h:mm") }}</div>
                    </div>
                </div>
            <div class="typing-box">
             <form @submit.prevent="sendMessage" name="send-message">
                <textarea name="messaging" id="messaging-text" cols="70"
                rows="10" placeholder="Write a message..."></textarea>
               <button id="send-message" type="submit">Send</button>
            </form>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dbChats } from '../main'
import firebase from 'firebase'

export default {
  computed: {
    ...mapGetters({
      chat: 'getChat',
      chatId: 'getCurrentChatId'
    })
  },
  methods: {
    sendMessage () {
      dbChats.doc(this.chatId).collection('messages').doc().set({
        content: event.target.children[0].value.replace(/\n\r?/g, '<br />'),
        from: this.$store.state.profile.username,
        name: this.$store.state.profile.name,
        time: this.getDate()
      })
      event.target.children[0].value = null
    },
    getMessageUserClass (fromUser) {
      if (fromUser === this.$store.state.profile.username) {
        return 'my-class-message'
      } else {
        return 'friend-class-message'
      }
    },
    getDate () {
      const date = firebase.firestore.Timestamp.now().seconds
      return date
    },
    scrollToEnd () { // Put the message scroll bar at bottom
      var content = this.$refs.boxMessaging
      content.scrollTop = content.scrollHeight
    }
  },
  updated () {
    this.scrollToEnd()
  }
}
</script>

<style scoped>
.chat-box {
    flex-grow: 2;
    border-left: solid 1px #cdcfd2;
}
.box-messaging {
    height: 400px;
    border-bottom: solid 4px #2620d8;
    padding: 20px 10px 0px 40px;
    overflow: scroll;
}

.typing-box {
    height: 195px;
    position: relative;
}

.typing-box textarea {
    outline: none;
    border: none;
}

.friend-class-message {
    width: 350px;
    padding: 15px 15px 5px 15px;
    border: solid 1px #B4D6D3;
    background-color: #B4D6D3;
    border-radius: 1em;
    margin-bottom: 10px;
}
.my-class-message {
    width: 350px;
    padding: 15px 15px 5px 15px;
    border: solid 1px #BDD5EA;
    background-color: #BDD5EA;
    border-radius: 1em;
    margin-bottom: 10px;
    margin-left: 110px;
}

.time {
    font-style: italic;
    font-size: 11px;
    text-align: right;
}

#send-message {
    border: none;
    color: white;
    background-color: #008CBA;
    font-size: 16px;
    width: 80px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    position: absolute;
    border-radius: .2em;
    margin: 2px;
    bottom: 2px;
    right: 10px;
    cursor: pointer;
}
#messaging-text {
    border: none;
    outline: none;
    white-space: pre-wrap;
    resize: none;
    padding: 5px;
}
.name-in-message {
  font-weight: bold;
  margin-bottom: 10px;
}
.name-in-message span {
  font-style: italic;
  font-weight: normal;
}
</style>
