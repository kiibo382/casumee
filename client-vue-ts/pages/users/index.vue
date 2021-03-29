<template>
  <div class="users">
    <hr />
    <ul v-for="userData in usersData">
      <h3>user name: {{ userData.userName }}</h3>
      <li>email: {{ userData.email }}</li>
      <li>first name: {{ userData.firstName }}</li>
      <li>last name: {{ userData.lastName }}</li>
      <hr />
    </ul>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const usersData = await $axios.$get('users')
    return { usersData }
  },
}
</script>