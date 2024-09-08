<template>
    <v-card v-if="user != null" :prepend-avatar="avatar_url" :title="user.username" :subtitle="user.email">
        <v-alert v-if="error != null" type="error">
            {{ error }}
        </v-alert>
        <v-card-text>
            <v-form>
                <v-textarea v-model="comment" :label="$t('inputComments')" auto-grow/>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn text @click="postComment">{{ $t('postComment') }}</v-btn>
        </v-card-actions>
        <v-card-title>{{ $t('commentAreaTitle') }}</v-card-title>
        <CommentArea ref="areaRef" :tweet-id="props['tweetId']" />
    </v-card>
    <v-card v-else>
        <v-card-title>{{ $t('loginFirst') }}</v-card-title>
        <v-card-title>{{ $t('commentAreaTitle') }}</v-card-title>
        <CommentArea ref="areaRef" :tweet-id="props['tweetId']" />
    </v-card>
</template>

<script setup>
import CommentArea from '~/components/CommentArea.vue';

const user = ref(null)
const avatar_url = ref('/icon.png')
const error = ref(null)
const comment = ref('')
const props = defineProps({
    tweetId: number
});
const areaRef = ref(null)

onMounted(async () => {
    try {
        const data = await $fetch('/api/auth/user');
        user.value = data.user;
        const avatar_data = await $fetch(`/api/avatar/${user.value.user_id}`)
        avatar_url.value = avatar_data.data
    } catch (err) {
        error.value = err
    }
});

const postComment = async () => {
    try {
        await $fetch('/api/comment/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tweet_id: props['tweetId'],
                content: comment.value
            })
        })
        comment.value = ''
        if (areaRef.value != null) {
            areaRef.value.updateComments()
        }
    } catch (err) {
        error.value = err
    }
}
</script>