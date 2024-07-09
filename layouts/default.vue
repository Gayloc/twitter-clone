<template>
  <v-app :dark="isDark">
    <NavBar />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
import { useCustomTheme } from '~/composables/useCustomTheme'

const { isDark } = useCustomTheme()
</script>