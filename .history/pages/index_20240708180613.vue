<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { data: tweets } = await $fetch("/api/tweets", {
  method: 'GET'
})
</script>