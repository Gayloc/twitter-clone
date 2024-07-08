<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card>
                    <v-card-title class="headline">{{ tweet.title }}</v-card-title>
                    <v-card-text>{{ tweet.content }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const route = useRoute()
const { data: tweet } = await $fetch("/api/tweets/"+route.params.id)
</script>
