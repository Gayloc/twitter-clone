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
// 导入用户设置
import { ref } from 'vue';
import { useUserStore } from '~/stores/user';
const localePath = useLocalePath();
const userStore = useUserStore();

// 定义数据
const email = ref('');
const password = ref('');

// TODO 获取用户信息函数
const setUserStore = async () => {
  // TODO 调用接口获取用户信息
  const response =
    await $fetch('/api/user/getUserInfo');
    // TODO 成功操作
  if (response.success) {
    userStore.setUser(response.userIn);
    userStore.setLikeList(response.likes);
    ElMessage.success(response.message);
  }
  // TODO 失败操作
  if (!response.success) {
    ElMessage.error(response.message);
  }
};

// TODO 登录
const login = async () => {
  // TODO 验证邮箱和密码是否为空
  if (!email.value || !password.value) {
    error.value = 'Email and password are required';
    return;
  }

  // TODO 调用登录接口
  try { 
    // TODO 调用登录接口
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
    // TODO 失败操作
    if (!response.success) {
      ElMessage.error(response.message);
      throw new Error(response.message);
    }
    // TODO 成功操作
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