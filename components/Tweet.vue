<template>
  <v-card class="mb-3" @click="goToDetail">
    <v-card-text>{{ tweet.content }}</v-card-text>
    <v-card-actions>
      <v-btn text @click.stop="likeTweet">Like</v-btn>
      <v-btn text @click.stop="commentOnTweet">Comment</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
});

const { tweet } = toRefs(props);
const router = useRouter();

const goToDetail = () => {
  router.push(`/detail/${tweet.value.id}`);
};

const likeTweet = () => {
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
