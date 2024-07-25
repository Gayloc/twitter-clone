<template>
  <v-container>
    <v-row v-if="user" class="d-flex flex-wrap">
        <v-col v-for="tweet in user.data" :key="tweet.id" cols="12" md="6" lg="4">
          <TweetCard :tweet="tweet" />
        </v-col>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
  </v-container>
</template>

<script setup>
import TweetCard from '~/components/TweetCard.vue';

const { data: user } = await useFetch('/api/tweets');
</script>