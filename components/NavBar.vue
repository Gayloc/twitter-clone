<template>
    <v-app-bar app>
        <v-btn icon="mdi-arrow-left" @click="goBack"/>
        <v-toolbar-title>{{ $t('TwitterClone') }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon="mdi-translate" @click="setLocale(locale === 'en' ? 'zh' : 'en')" />
        <v-btn icon="mdi-theme-light-dark" @click="toggleTheme()"/>
        <v-btn icon="mdi-home" :to="localePath('/')"/>
        <v-btn icon="mdi-account" :to="localePath('/login')"/>
    </v-app-bar>
</template>

<script setup>
const router = useRouter();
const colorMode = useColorMode();
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const toggleTheme = () => {
    console.log(colorMode.value);
    if (colorMode.value === 'light') {
        colorMode.preference = 'dark';
    } else if (colorMode.value === 'dark') {
        colorMode.preference = 'light';
    }
};

const goBack = () => {
    router.go(-1);
};
</script>

<style scoped></style>
