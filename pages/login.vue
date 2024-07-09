<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title class="headline">Login</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" label="Email" required/>
                <v-text-field v-model="password" label="Password" type="password" required/>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const login = () => {
    // 登录逻辑
  };
  </script>
  
  <style scoped>
  .headline {
    font-weight: bold;
  }
  </style>
  