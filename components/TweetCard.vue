<template>
  <v-card class="mb-3" @click="goToDetail">
    <v-img
      :src="tweet.cover"
      style="height: 240px;"
      cover
    />
    <v-card-title class="d-flex justify-center">
      {{ tweet.title === '' ? '无标题' : tweet.title }}
    </v-card-title>
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

const localePath = useLocalePath();
const isComment = ref(false);
const isLike = ref(userStore.Token === ''? false : userStore.likeList.map(item => item.like_id).includes(tweet.value.id));

// TODO 点击卡片跳转到详情页
const goToDetail = () => {
  router.push(localePath(`/detail/${tweet.value.id}`));
};

// TODO 获取用户信息函数
const setUserStore = async () => {
  // TODO 调用接口获取用户信息
  const response =
    await $fetch('/api/user/userInfo');
    // TODO 成功操作
  if (response.success) {
    userStore.setUser(response.userIn);
    userStore.setLikeList(response.likes);
    ElMessage.success(response.message);
  }
  // TODO 失败操作
  if (!response.success) {
    ElMessage.error(response.message);
  }
};

// TODO 点赞
const likeTweet = async () => {
  if (!userStore.Token) {
    ElMessage.error('请先登录');
    return;
  }
  try {
    const response = await $fetch('/api/article/likeArticle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        articleId: tweet.value.id
      })
    });
    if (!response.success) {
      ElMessage.error(response.message);
    }
    if (response.success) {
      isLike.value = !isLike.value;
      ElMessage.success(response.message);
      setUserStore();
    }
  } catch (error) {
    ElMessage.error(response.message);
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
  isLike: computed(() => isLike.value)
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

.v-card-title {
  font-size: 1.2rem;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
}
</style>
