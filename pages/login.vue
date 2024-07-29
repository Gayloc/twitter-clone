<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="4" class="ma-5">
        <v-card>
          <v-card-title class="headline ma-5 d-flex justify-center">
            {{ $t('login') }}
          </v-card-title>
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

const setUserStore = async () => {
  const response =
    await $fetch('/api/user/userInfo');
  if (response.success) {
    userStore.setUser(response.userIn);
    ElMessage.success(response.message);
  }
  if (!response.success) {
    ElMessage.error(response.message);
  }
};

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Email and password are required';
    return;
  }

  try { 
    const response = await $fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });
    if (!response.success) {
      ElMessage.error(response.message);
      throw new Error(response.message);
    }
    if (response.success) { 
      ElMessage.success(response.message);
      userStore.setToken(response.token);
      setUserStore();
      navigateTo('/');
    }
  } catch (error) {
    ElMessage.error(error.message);
  }
};
</script>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
