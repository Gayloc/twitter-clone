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
    <v-card 
      v-if="isComment" 
      variant="tonal" 
      class="d-flex flex-column pa-4" 
      style="width: 80%; margin-left: 5%;">
      <comment-card  :title="tweet.content"/>
    </v-card>
  </v-card>
</template>

<script setup>
const isLike = ref(false);
const localePath = useLocalePath();
const isComment = ref(false);

const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
});

const { tweet } = toRefs(props);
const router = useRouter();

const goToDetail = () => {
  router.push(localePath(`/detail/${tweet.value.id}`));
};

const likeTweet = () => {
  isLike.value = !isLike.value;
  // TODO: 发送点赞请求
  // ...
  if (isLike.value) {
    ElMessage.success('点赞成功');
  } else {
    ElMessage.success('取消点赞成功');
  }
};

const commentOnTweet = () => {
  isComment.value = !isComment.value;
  // TODO: 跳转到评论页面
  // ...
};

</script>

<style scoped>
.mb-3 {
  margin-bottom: 16px;
}
</style>
