<template>
  <v-container >
    <v-navigation-drawer
    >
      <v-list
        class="d-flex flex-column fill-height"
        density="compact"
      >
          <v-list-item
            v-if="!userStore.Token"
          />
          <v-list-item
            v-else
            :prepend-avatar="userStore.user.avatar"
            :subtitle="userStore.user.email"
            :title="userStore.user.userName"
          />
          <v-divider/>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :prepend-icon="item.icon"
            :title="item.title"
            @click="navigateTo(item.route)"
          />
          <v-spacer/>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            @click="logout()"
          />
        </v-list>
    </v-navigation-drawer>
    <v-main class="pa-0 ma-0">
      <NuxtPage />
    </v-main>
  </v-container>
</template>

<script setup>
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const items = ref([
  { title: 'Home', route: '/main' , icon: 'mdi-home-account'},
  { title: 'My Like', route: '/mylike', icon: 'mdi-thumb-up-outline' },
  { title: 'My article', route: '/myarticle', icon: 'mdi-creation-outline' },
  { title: 'My Account', route: '/myaccount', icon: 'mdi-account-cog' },
  { title: 'About', route: '/about', icon: 'mdi-information' }
]);

const logout = async () => {
  const response = await $fetch('/api/user/logout');
  userStore.setToken('');
  userStore.setUser({});
  ElMessage.success(response.message);
  navigateTo('/login');
};
</script>