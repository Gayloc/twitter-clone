<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="9">
                <v-card v-if="tweet">
                    <v-card-title class="headline justify-center">{{ tweet.title }}</v-card-title>
                    <v-card-text>{{ tweet.main }}</v-card-text>
                </v-card>
                <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const route = useRoute();
const tweet = ref(null);

const getTweet = async () => {
    try {
        const response = await $fetch('/api/article/' + route.params.id);
        if (!response.success) {
            ElMessage.error(response.message);
        }
        if (response.success) {
            tweet.value = response.article;
        }
    } catch (error) {
        ElMessage.error(response.message);
    }
};

onMounted(async () => {
    await getTweet();
});
</script>