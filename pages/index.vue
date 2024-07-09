<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <TweetCard v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TweetCard from '~/components/TweetCard.vue';

const { data: tweets } = await $fetch("/api/tweets", {
  method: 'GET'
})
</script>