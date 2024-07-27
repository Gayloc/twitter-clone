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
        <v-row class="d-flex justify-center">
          <v-col cols="8" >
            <v-container class="max-width ">
              <v-pagination
                v-model="page"
                :length="length"
                class="my-4"
              />
            </v-container>
          </v-col>
      </v-row>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
</template>

<script lang="ts" setup>
import TweetCard from '~/components/TweetCard.vue';
import WelcomeCard from '~/components/WelcomeCard.vue';

const page = ref(1);
const length = ref(15);

const { data: user } = await useFetch('/api/tweets');
</script>