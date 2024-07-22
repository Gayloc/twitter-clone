<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col>
                <v-alert type="error" v-if="error != null">
                    {{ error }}
                </v-alert>
                <v-card :prepend-avatar="avatar_url" :title="user.username" :subtitle="userTime" v-if="user != null">
                    <template v-slot:append>
                        <v-card-actions>
                            <v-btn :href="`mailto:${user.email}?subject=Re:${tweet.content}`">email</v-btn>
                            <v-btn :href="`mailto:${user.email}?subject=Re:${tweet.content}`">follow</v-btn>
                            <v-btn :href="`mailto:${user.email}?subject=Re:${tweet.content}`">profile</v-btn>
                        </v-card-actions>
                    </template>
                    <v-card-text>{{ tweet.content }}</v-card-text>
                    <v-card-text>
                        <v-carousel @click.stop v-if="images.length > 0" show-arrows="hover" progress hide-delimiters>
                            <v-carousel-item v-for="image in images" :key="image.media_id"
                                :src="image.media_url"></v-carousel-item>
                        </v-carousel>
                        <video controls :src="video" v-if="video != null" width="100%" style="max-height: 70vh;"
                            @click.stop></video>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn icon @click.stop="likeTweet">
                            <v-icon v-if="isLike">
                                mdi-thumb-up
                            </v-icon>
                            <v-icon v-else>
                                mdi-thumb-up-outline
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                    <CommentEditor :tweetId="$route.params.id" />
                </v-card>
                <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import moment from 'moment-timezone';
import CommentEditor from '~/components/CommentEditor.vue';

const route = useRoute()
const user = ref(null)
const avatar_url = ref('/icon.png')
const error = ref(null)
const tweet = ref(null)
const images = ref([])
const video = ref(null)
const isLike = ref(false)
const localePath = useLocalePath();

const likeTweet = async () => {
  try {
      await $fetch(`/api/tweets/like/${route.params.id}`)
      updateLike()
    } catch(err) {
      if (err.statusCode == 401) {
        navigateTo(localePath('/login'))
      }
    }
};

const updateLike = async () => {
    try {
      const data = await $fetch(`/api/tweets/like/check/${route.params.id}`)
      isLike.value = data.like
    } catch(err) {
      console.log(err)
    }
}

try {
    const tweet_data = await $fetch(`/api/tweets/${route.params.id}`)
    tweet.value = tweet_data.data
    const user_data = await $fetch(`/api/user/${tweet.value.user_id}`)
    user.value = user_data.user
    const avatar_data = await $fetch(`/api/avatar/${tweet.value.user_id}`)
    avatar_url.value = avatar_data.data

    const media_data = await $fetch(`/api/media/${tweet.value.tweet_id}`)
    if (media_data.data.length > 0) {
        if (media_data.data[0].media_type == "video") {
            video.value = media_data.data[0].media_url
        } else {
            for (let data of media_data.data) {
                images.value.push(data)
            }
        }
    }
} catch (err) {
    error.value = err
}

onMounted(() => {
    updateLike()
})

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userTime = moment.utc(tweet.value.created_at).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss');
</script>