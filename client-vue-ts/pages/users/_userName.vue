<template>
  <div class="user">
    <p>user name: {{ userData.userName }}</p>
    <p>email: {{ userData.email }}</p>
    <p>first name: {{ userData.firstName }}</p>
    <p>last name: {{ userData.lastName }}</p>
    <NuxtLink :to="`/users/${userData.userName}/${loginUserName}`"
      >chat page</NuxtLink
    >
  </div>
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
    const userData = await $axios.$get(`users/${params.userName}`)
    return { userData }
  },
}
</script>
