<template>
    <v-app v-if="!$colorMode.unknown">
      {{ $vuetify.theme.global.name = $colorMode.value }}
      <NavBar />
      <v-main>
        <slot />
      </v-main>
    </v-app>
    <v-app v-else>
      <v-main>
        <v-alert type="info">加载中</v-alert>
      </v-main>
    </v-app>
</template>

<script setup>
import NavBar from '~/components/NavBar.vue'
const colorMode = useColorMode()
colorMode.preference = 'system'
</script>