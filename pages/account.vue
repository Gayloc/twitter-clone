<template>
    <v-container v-if="user != null">
        <v-card>
            <Avatar :user="user"></Avatar>
            <v-card-title class="headline">
                {{ user.username }}
            </v-card-title>
            <v-card-text>
                {{ user.email }}
            </v-card-text>
            <v-card-actions>
                <v-btn text @click.stop="logout">{{ $t('logout') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
    <v-alert type="error" v-if="error != null">
        {{ error }}
    </v-alert>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Avatar from '~/components/Avatar.vue';

const user = ref(null);
const error = ref(null)

onMounted(async () => {
    try {
        const data = await $fetch('/api/auth/user');
        user.value = data.user;
    } catch (err) {
        if (err.statusCode == 401) {
            navigateTo('/login')
        } else {
            error.value = err
        }
    }
});

const logout = async () => {
    try {
        const result = await $fetch('/api/auth/logout');
        if (result.success) {
            navigateTo('/')
        } else {
            error.value = result.message
        }
    } catch (err) {
        error.value = err
    }
}
</script>

<style scoped>
h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
}

p {
    margin: 0.5em 0;
}
</style>