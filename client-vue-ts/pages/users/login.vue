<template>
  <div class="mt-3">
    <v-card class="mt-5 mx-auto" max-width="600">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row justify="center">
            <p cols="12" class="mt-3 display-1 grey--text">Login</p>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="form.email" label="email" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field
                v-model="form.password"
                type="password"
                label="password"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn block class="mr-4 blue white--text" @click="userLogin">
                Login
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <NuxtLink to="/users/signup"> Signup page </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      form: {
        password: '',
        email: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form,
        })
        this.$router.replace({ path: '/' })
      } catch (error) {
        console.log(error)
        window.alert('ログインに失敗しました。再実行してください。')
      }
    },
  },
}
</script>
