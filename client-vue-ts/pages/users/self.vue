<template>
  <div class="user">
    <p>user name: {{ userData.userName }}</p>
    <p>email: {{ userData.email }}</p>
    <p>first name: {{ userData.firstName }}</p>
    <p>last name: {{ userData.lastName }}</p>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const userData = await $axios.$get('users/self')
    return { userData }
  },
}
</script>
