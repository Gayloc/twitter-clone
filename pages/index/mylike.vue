<template>
    <v-row v-if="user" class="d-flex flex-wrap">
        <v-col 
        v-for="tweet in user.data.filter(tweet => likes.includes(tweet.id))"
        :key="tweet.id" 
        cols="16"
        md="12"
        lg="6" 
        style="min-width: 100%"
        >
          <TweetCard 
            :tweet="tweet"/>
        </v-col>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
</template>

<script lang="js" setup>
import TweetCard from '~/components/TweetCard.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
const likes = userStore.user.userLikes;
const { data: user } = await useFetch('/api/tweets');
</script>