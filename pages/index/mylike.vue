<template>
    <v-row v-if="user" class="d-flex flex-wrap">
        <v-col 
        v-for="tweet in user.data"
        :key="tweet.id" 
        cols="12"
        md="4"
        >
        <TweetCard 
            :tweet="tweet"/>
        </v-col>
        <v-col 
        v-if="user.data.length === 0" 
        cols="16" 
        md="12" 
        lg="6" 
        style="min-width: 100%">
        <v-empty-state
            headline="No Messages Yet"
            text="You haven't received any messages yet.
            When you do, they'll appear here."
            title="Check back later."
        />
        </v-col>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
</template>

<script lang="ts" setup>
import TweetCard from '~/components/TweetCard.vue';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
const likes = userStore.likeList;
console.log(likes);
const { data: user } = await useFetch('/api/tweets');
</script>