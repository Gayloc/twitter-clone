<template>
  <v-card class="mb-3" @click="goToDetail">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    />
    <v-card-title class="d-flex justify-center">{{ tweet.content }}</v-card-title>
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
          @click.stop="event.stopPropagation()"
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
// 导入用户设置
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
const rating = ref(0);

// 检查是否登录，防止includes报错空对象
// const isLike
//   = !userStore.Token ?
//     false : computed(() => userStore.likeList.includes(tweet.value.id));
const localePath = useLocalePath();
const isComment = ref(false);

const isLike = ref(false);

// TODO 从父组件导入标题
const props = defineProps({
  tweet: {
    type: Object,
    required: true
  }
});

// 展开标题
const { tweet } = toRefs(props);
const router = useRouter();

// TODO 点击卡片跳转到详情页
const goToDetail = () => {
  router.push(localePath(`/detail/${tweet.value.id}`));
};

// TODO 点赞
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

// TODO 评论页
const commentOnTweet = () => {
  if (!userStore.Token) {
    ElMessage.error('请先登录');
    return;
  }
  isComment.value = !isComment.value;
  // TODO: 获取评论
  // ...
};

// 导出点赞详情给父组件
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
