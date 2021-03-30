<template>
  <v-row>
    <v-col cols="12">
      <v-card height="400" width="600">
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
    const userData = await $axios.$get('users/self')
    return { userData }
  },
}
</script>
