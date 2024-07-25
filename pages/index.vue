<template>
  <v-container>
    <v-navigation-drawer>
      <v-list density="compact" nav>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Me"
          />
        </v-list>
        <v-divider/>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"/></v-list>
    </v-navigation-drawer>
    <v-main class="pa-0 ma-0">
      <v-row v-if="user" class="d-flex flex-wrap">
          <v-col 
          v-for="tweet in user.data" 
          :key="tweet.id" 
          cols="16" 
          md="12" 
          lg="6"
          style="min-width: 100%" 
          >
            <TweetCard :tweet="tweet" />
          </v-col>
      </v-row>
      <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
  </v-main>
  </v-container>
</template>

<script setup>
import TweetCard from '~/components/TweetCard.vue';

const { data: user } = await useFetch('/api/tweets');
</script>