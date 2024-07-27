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
        <v-col 
        v-if="userStore.user.userLikes.length === 0" 
        cols="16" 
        md="12" 
        lg="6" 
        style="min-width: 100%">
        <v-empty-state
            headline="No Messages Yet"
            text="You haven't received any messages yet.
            When you do, they'll appear here."
            title="Check back later."
            @click:action="onClickAction"
        />
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