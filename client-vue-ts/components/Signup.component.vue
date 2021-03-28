<template>
  <div class="mt-3">
    <v-card class="mt-5 mx-auto" max-width="600">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row justify="center">
            <p cols="12" class="mt-3 display-1 grey--text">Signup</p>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="userName" label="user name" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="firstName" label="first name" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="lastName" label="last name" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="email" label="email" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field
                v-model="password"
                type="password"
                label="password"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-btn block class="mr-4 blue white--text" @click="userSignup">
                Signup
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <NuxtLink to="/users/login"> Login page </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async userSignup() {
      try {
        await this.$axios.post('/users', {
          userName: this.userName,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
      } catch (error) {
        console.log(error)
        window.alert("サインアップに失敗しました。再実行してください。")
      }
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          window.alert("ログイン成功！")
          this.$router.replace({ path: '/' });
      } catch(error) {
        console.log(error)
        window.alert("ログインに失敗しました。再実行してください。")
      }
    },
  },
}
</script>