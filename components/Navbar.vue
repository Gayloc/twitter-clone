<template>
    <v-app-bar app>
        <v-btn text @click="goBack">Back</v-btn>
        <v-toolbar-title>Twitter Clone</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text to="/">Home</v-btn>
        <v-btn text to="/login">Login</v-btn>
    </v-app-bar>
</template>

<script setup>
const router = useRouter();

const goBack = () => {
    router.go(-1);
}
</script>

<style scoped></style>
