<template>
    <v-row v-if="user" class="d-flex flex-wrap">
      <v-col
        cols="12"
        md="12">
      <WelcomeCard/>
      </v-col>
        <v-col 
        v-for="tweet in user.data" 
        :key="tweet.id"
        cols="12"
        md="4"
        >
          <TweetCard :tweet="tweet" />
        </v-col>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
</template>

<script lang="ts" setup>
import TweetCard from '~/components/TweetCard.vue';
import WelcomeCard from '~/components/WelcomeCard.vue';

const { data: user } = await useFetch('/api/tweets');
</script>