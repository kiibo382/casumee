<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>user name: {{ userData.userName }}</v-card-title>
        <v-card-text>
          email: {{ userData.email }}<br />
          first name: {{ userData.firstName }}<br />
          lastname: {{ userData.lastName }}<br />
          <NuxtLink :to="`/users/${userData.userName}/dm`"
            >Direct Message</NuxtLink
          >
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: 'checkSelf',
  data({ $auth }) {
    return {
      loginUserName: $auth.user.userName,
    }
  },
  async asyncData({ params, $axios }) {
    const userData = await $axios.$get(`/users/${params.userName}`)
    return { userData }
  },
}
</script>
