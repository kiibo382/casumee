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
              <v-text-field v-model="form.userName" label="user name" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="form.firstName" label="first name" />
              <p class="caption mb-0" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="10" sm="10">
              <v-text-field v-model="form.lastName" label="last name" />
              <p class="caption mb-0" />
            </v-col>
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
      form: {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async userSignup() {
      try {
        await this.$axios.post('/users', this.form)
      } catch (error) {
        window.alert('サインアップに失敗しました。再実行してください。')
        return
      }
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        window.alert('ログイン成功！')
        this.$router.replace({ path: '/' })
      } catch (error) {
        window.alert('ログインに失敗しました。再実行してください。')
      }
    },
  },
}
</script>