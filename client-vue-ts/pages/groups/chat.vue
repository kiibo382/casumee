<template>
  <section class="section">
    <article
      class="media"
      v-for="(chatData, index) in chatDataList"
      :key="index"
    >
      <div class="media-content">
        <div class="content">
          <p>
            <strong>socket id: {{ chatData.socketId }}</strong>
            <br />
            <NuxtLink :to="`/users/${chatData.userName}`"> User page </NuxtLink>
            <br />
            username: {{ chatData.userName }}
            <br />
            message: {{ chatData.msg }}
            <br />
          </p>
        </div>
      </div>
    </article>
    <div class="field">
      <div class="control">
        <v-form ref="form" lazy-validation>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="10" sm="10">
                <v-text-field v-model="msg" />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="10" sm="10">
                <v-btn block class="mr-4 blue white--text" @click="sendMessage">
                  send
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      msg: '',
      chatDataList: [],
      socket: null,
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'home',
      channel: '/',
      reconnection: false,
    })
    this.socket.on('new-chat-data', (chatData) => {
      this.chatDataList.push(chatData)
    })
  },
  methods: {
    sendMessage() {
      this.msg = this.msg.trim()
      if (this.msg) {
        this.socket.emit('send-chat-data', {
          socketId: this.socket.id,
          userName: this.$auth.user.userName,
          msg: this.msg,
        })
        this.msg = ''
      }
    },
  },
}
</script>
<style>
.nuxt-link-active {
  color: red;
}
</style>
