<template>
  <v-app v-if="!$colorMode.unknown">
    {{ $vuetify.theme.global.name = $colorMode.value }}
    <NavBar />
    <v-main>
      <slot />
    </v-main>
  </v-app>
  <v-app v-else>
    <NavBar />
    <v-main>
      <v-container class="d-flex justify-center">
        <v-progress-circular color="primary" indeterminate/>
      </v-container>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
const colorMode = useColorMode()
colorMode.preference = 'system'
</script>