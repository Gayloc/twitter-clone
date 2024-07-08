<template>
    <v-app>
      <Navbar />
      <v-main>
        <slot></slot>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import Navbar from '~/components/Navbar.vue'
  
  export default {
    components: {
      Navbar
    }
  }
</script>
  