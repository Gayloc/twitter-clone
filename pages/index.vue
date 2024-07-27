<template>
  <v-container>
    <v-navigation-drawer
      :location="height.value < 400 ? 'bottom' : 'left'"
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
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            :subtitle="userStore.user.email"
            :title="userStore.user.name"
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

const logout = () => {
  userStore.logout();
  navigateTo('/login');
};
const { name } = useDisplay();
const height = computed(() => {
  // name is reactive and
  // must use .value
  switch (name.value) {
    case 'xs': return 220;
    case 'sm': return 400;
    case 'md': return 500;
    case 'lg': return 600;
    case 'xl': return 800;
    case 'xxl': return 1200;
  }
  return undefined;
});
</script>