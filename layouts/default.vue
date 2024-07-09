<template>
  <ColorScheme placeholder="..." tag="span">
    <v-app :theme="$colorMode.value">
      <NavBar />
      <v-main>
        <slot />
      </v-main>
    </v-app>
  </ColorScheme>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
const colorMode = useColorMode()
colorMode.preference = 'system'
</script>