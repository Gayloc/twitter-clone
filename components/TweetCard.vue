<template>
  <v-card class="mb-3" @click="goToDetail">
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
      <v-btn icon="mdi-comment-outline" @click.stop="commentOnTweet"/>
    </v-card-actions>
  </v-card>
</template>

<script setup>
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

const goToDetail = () => {
  router.push(localePath(`/detail/${tweet.value.tweet_id}`));
};

const likeTweet = () => {
  isLike.value = !isLike.value
  // 发送点赞请求
};

const commentOnTweet = () => {
  // 跳转到评论页面
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 16px;
}
</style>
