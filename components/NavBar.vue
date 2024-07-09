<template>
    <v-app-bar app>
        <v-btn icon="mdi-arrow-left" @click="goBack"/>
        <v-toolbar-title>Twitter Clone</v-toolbar-title>
        <v-spacer/>
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme()"/>
        <v-btn icon="mdi-home" to="/"/>
        <v-btn icon="mdi-account" to="/login"/>
    </v-app-bar>
</template>

<script setup>
import { useCustomTheme } from '~/composables/useCustomTheme'

const { toggleTheme } = useCustomTheme()

const router = useRouter();

const goBack = () => {
    router.go(-1);
}
</script>

<style scoped></style>
