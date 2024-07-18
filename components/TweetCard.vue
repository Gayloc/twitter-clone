<template>
  <v-card class="mb-3" @click="goToDetail" :prepend-avatar="avatar_url" :title="user.username" :subtitle="userTime"
    v-if="user != null" style="display: flex; flex-direction: column;">
    <v-divider></v-divider>
    <v-alert type="error" v-if="error != null">
      {{ error }}
    </v-alert>
    <v-card-text :class="{'text-content': !hasMedia, 'content': hasMedia}">
      {{ tweet.content }}
    </v-card-text>
    <v-carousel @click.stop v-if="images.length > 0" height="300px">
      <v-carousel-item v-for="image in images" :key="image.media_id" :src="image.media_url" cover></v-carousel-item>
    </v-carousel>
    <video controls :src="video" v-if="video != null" height="300px" @click.stop muted autoplay loop></video>
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
  </v-card>
</template>

<script setup>
import moment from 'moment-timezone';
const isLike = ref(false)
const localePath = useLocalePath();

const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
});

const { tweet } = toRefs(props);
const router = useRouter();

const user = ref(null)
const avatar_url = ref('/icon.png')
const error = ref(null)
const images = ref([])
const video = ref(null)

const goToDetail = () => {
  router.push(localePath(`/detail/${tweet.value.tweet_id}`));
};

const likeTweet = () => {
  isLike.value = !isLike.value
  // 发送点赞请求
};

onMounted(async () => {
  try {
    const user_data = await $fetch(`/api/user/${tweet.value.user_id}`)
    user.value = user_data.user
    const avatar_data = await $fetch(`/api/avatar/${user.value.user_id}`)
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
})

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userTime = moment.utc(tweet.value.created_at).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss');

const hasMedia = computed(() => images.value.length > 0 || video.value != null);
</script>

<style scoped>
.mb-3 {
  margin-bottom: 16px;
}

.content {
  white-space: nowrap;
  overflow: hidden;
  /* 隐藏溢出内容 */
  text-overflow: ellipsis;
  /* 添加省略号 */
}

.text-content {
  height: 350px;
  /* 设置最大高度 */
  overflow-y: auto;
}
</style>
