<template>
  <v-card class="mb-3" @click="goToDetail" :prepend-avatar="avatar_url" :title="user.username" :subtitle="userTime" v-if="user != null">
    <v-divider></v-divider>
    <v-alert type="error" v-if="error != null">
      {{ error }}
    </v-alert>
    <v-card-text>{{ tweet.content }}</v-card-text>
    <v-card-actions>
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
  } catch (err) {
    error.value = err
  }
})

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userTime = moment.utc(tweet.value.created_at).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss');
</script>

<style scoped>
.mb-3 {
  margin-bottom: 16px;
}
</style>
