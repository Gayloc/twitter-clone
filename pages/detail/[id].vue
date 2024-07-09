<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="8">
                <v-card v-if="tweet">
                    <v-card-title class="headline">{{ tweet.title }}</v-card-title>
                    <v-card-text>{{ tweet.content }}</v-card-text>
                </v-card>
                <v-alert v-else type="info">Loading...</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const route = useRoute()
const { data: tweet } = await $fetch("/api/tweets/" + route.params.id)
</script>