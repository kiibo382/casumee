<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="black"
        text
        rounded
        class="my-2"
      >
        <NuxtLink color="black" :to="`/${link}`">{{ link }}</NuxtLink>
      </v-btn>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ['about', 'services', 'blog', 'contact'],
  }),
}
</script>

<style>
.nuxt-link-active {
  color: rgba(0, 0, 0, 0.171);
}
</style>