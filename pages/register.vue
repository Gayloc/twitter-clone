<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="4" class="ma-5">
                <v-card>
                    <v-card-title class="headline ma-5 d-flex justify-center">
                        {{ $t('register') }}
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field 
                            v-model="email" 
                            :label="$t('email')" 
                            :rules="emailRules"
                            required 
                            />
                            <v-text-field
                            v-model="password" 
                            :rules="passwordRules" 
                            :label="$t('password')" 
                            type="password" 
                            required 
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn color="primary" @click="register()">
                            {{ $t('register') }}</v-btn>
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

const passwordRules = ref( [
    v => !!v || 'Name is required'
]);
const emailRules = ref( [
    v => !!v || 'Email is required',
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email is invalid'
]);

const register = async () => {
    if (email.value === '' || password.value === '') {
        ElMessage.error('Email and password are required.');
        return;
    }
    try {
        const response = await $fetch('/api/user/register', {
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
            throw { message: response.message, statusCode: response.statusCode };
        }
        if (response.success) {
            ElMessage.success(response.message);
            navigateTo('/login');
        } else {
            ElMessage.error(response.message);
        }
    } catch (error) { 
        if (error.statusCode === 400) {
            ElMessage.error('Email already exists.');
            error.value = 'email already exists';
        }
    }
};
</script>

<style scoped>
.headline {
    font-weight: bold;
}
</style>