<template>
  <v-container>
    <v-card image="/card-image.jpg" class="d-flex align-center" color="black">
      <v-avatar size="200" v-if="src.length>0">
        <v-img cover :src='src'></v-img>
      </v-avatar>
      <v-container>
        <v-card-title>{{ $t('welcome')+' '+username }}</v-card-title>
        <v-card-text>{{ $t('greeting') }}</v-card-text>
      </v-container>
    </v-card>
    <v-row v-if="tweets" class="d-flex flex-wrap">
      <v-col v-for="tweet in tweets" :key="tweet.tweet_id" cols="12" md="6" lg="4">
        <TweetCard :tweet="tweet" />
      </v-col>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
  </v-container>
</template>

<script setup>
import TweetCard from '~/components/TweetCard.vue';

const { data: tweets } = await $fetch("/api/tweets", {
  method: 'GET'
})

const src = ref('')
const username = ref('')

onMounted(async () => {
        const data = await $fetch('/api/auth/user');
        username.value = data.user.username;
});
</script>