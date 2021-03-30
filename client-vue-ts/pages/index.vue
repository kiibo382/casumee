<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the chat application
        </v-card-title>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row justify="center">
          <p cols="12" class="mt-3 display-1 grey--text">Logout</p>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="10" sm="10">
            <v-btn block class="mr-4 blue white--text" @click="userLogout">
              Logout
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  methods: {
    async userLogout() {
      try {
        const answer = window.confirm('ログアウトします。よろしいですか？')
        if (!answer) {
          return
        }
        await this.$auth.logout('local')
        this.$router.replace({ path: '/users/login' })
      } catch (error) {
        console.log(error)
        window.alert('ログアウトに失敗しました。再実行してください。')
      }
    },
  },
}
</script>
