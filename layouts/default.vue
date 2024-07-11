<template>
  <ColorScheme placeholder="加载中" tag="span">
    <v-app>
      {{ $vuetify.theme.global.name = $colorMode.value }}
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