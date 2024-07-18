<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>{{ $t('newTweetEdit') }}</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-textarea :label="$t('content')" v-model="content"></v-textarea>
                        </v-form>
                    </v-card-text>
                    <MediaEditor ref="mediaEditorRef"></MediaEditor>
                    <v-card-actions>
                        <v-btn text @click="postTweet">{{ $t('post') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-alert type="error" v-if="error != null">
            {{ error }}
        </v-alert>
    </v-container>
</template>

<script setup>
import MediaEditor from '~/components/MediaEditor.vue';

const user = ref(null)
const error = ref(null)
const content = ref('')
const mediaEditorRef = ref(null);
const localePath = useLocalePath()

const postTweet = async () => {
    try {
        const data = await $fetch('/api/tweets/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.value.user_id,
                content: content.value
            })
        })

        if (mediaEditorRef.value != null) {
            mediaEditorRef.value.upload(data.tweet_id)
        }
    } catch (err) {
        error.value = err
    }
    navigateTo(localePath('/'))
}

onMounted(async () => {
    try {
        const data = await $fetch('/api/auth/user');
        user.value = data.user;
    } catch (err) {
        if (err.statusCode == 401) {
            navigateTo(localePath('/login'))
        } else {
            error.value = err
        }
    }
});
</script>