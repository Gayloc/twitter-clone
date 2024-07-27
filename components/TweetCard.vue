<template>
  <v-card class="mb-3" @click="goToDetail">
    <v-card-title>{{ tweet.content }}</v-card-title>
    <v-card-text>
      {{ tweet.content }}
    </v-card-text>
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
      <v-spacer/>
        <v-rating
          v-model="rating"
          size="x-small"
          hover
        />
    </v-card-actions>
    <v-card
      v-if="isComment"
      variant="tonal" 
      class="d-flex flex-column pa-4 comment"
      @click.stop="event.stopPropagation()"
      >
      <comment-card  :title="tweet.content"/>
    </v-card>
  </v-card>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();

// 检查是否登录，防止includes报错空对象
const isLike
  = !userStore.Token ?
    false : computed(() => userStore.user.userLikes.includes(tweet.value.id));
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
  if (!userStore.Token) {
    ElMessage.error('请先登录');
    return;
  }
  // TODO: 发送点赞请求
  // ...
  if (!isLike.value) {
    userStore.user.userLikes.push(tweet.value.id);
    ElMessage.success('点赞成功');
  } else {
    userStore.user.userLikes =
      userStore.user.userLikes.filter(id => id !== tweet.value.id);
    ElMessage.success('取消点赞成功');
  }
};

const commentOnTweet = () => {
  if (!userStore.Token) {
    ElMessage.error('请先登录');
    return;
  }
  isComment.value = !isComment.value;
  // TODO: 获取评论
  // ...
};

defineExpose ({
  isLike
});
</script>

<style scoped lang="scss">
.mb-3 {
  margin-bottom: 16px;
}

.comment {
  width: 80%;
  margin-left: 5%;
}
</style>
