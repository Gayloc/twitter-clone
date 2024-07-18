<template>
    <v-card image="/card-image.jpg" class="d-flex justify-space-between align-center">
        <v-avatar size="200">
            <v-img cover :src='src'></v-img>
        </v-avatar>
        <v-card-actions>
            <v-btn text color="yellow-lighten-2">{{ $t('changeAvatar') }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
const props = defineProps(['src']);
const src = ref('/icon.png')
if (props.src != null) {
    src.value = props.src
}
</script>
