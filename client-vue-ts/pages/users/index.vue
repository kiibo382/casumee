<template>
  <v-row>
    <v-col v-for="(userData, index) in usersData" :key="index" cols="4">
      <v-card height="200">
        <v-card-title>user name: {{ userData.userName }}</v-card-title>
        <v-card-text>
          email: {{ userData.email }}<br />
          first name: {{ userData.firstName }}<br />
          last name: {{ userData.lastName }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const usersData = await $axios.$get('users')
    return { usersData }
  },
}
</script>