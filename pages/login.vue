<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">{{ $t('login') }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" :label="$t('email')" required />
              <v-text-field 
              v-model="password" 
              :label="$t('password')" 
              type="password" 
              required
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="login">{{ $t('login') }}</v-btn>
            <v-btn 
            color="secondary" 
            :to="localePath('/register')">{{ $t('register') }}
          </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';
const localePath = useLocalePath();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const login = async () => {
  const res = await useFetch('/api/login');
  console.log(res.data._rawValue.data[0].user);
  userStore.setUser(res.data._rawValue.data[0].user);
  userStore.setToken(res.data._rawValue.data[1].Token);
  ElMessage.success('Login successful!');
  navigateTo('/');
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
