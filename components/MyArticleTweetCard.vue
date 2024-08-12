<!-- MyArticleTweetCard.vue -->
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
        <v-spacer/>
        <v-btn color="error" variant="tonal" @click.stop="dialog = true">删除</v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <v-card
          text="在下边输入你的文章标题，确认删除你的文章。"
          title="确定要删除你的文章吗?"
        >
          <v-card-text>
            文章标题：{{ tweet.title }}
          </v-card-text>
          <v-text-field 
            v-model="deleteTitle"
            label="请输入文章标题"
            type="text"
            required
          />
          <template #actions>
            <v-spacer/>
            <v-btn @click="dialog = false">
              取消
            </v-btn>
            <v-btn @click="deleteArticle">
              确认
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup>
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

  // 确认删除文章的弹窗
  const dialog = ref(false);

  const deleteTitle = ref('');
  
  const localePath = useLocalePath();
  
  // TODO 点击卡片跳转到详情页
  const goToDetail = () => {
    router.push(localePath(`/detail/${tweet.value.id}`));
  };

  // 定义一个发射器
const emit = defineEmits(['updateList']);

const updateList = () => {
  emit('updateList');
};

  const deleteArticle = async () => {
    // TODO 验证文章标题是否正确
    if (deleteTitle.value !== tweet.value.title) {
      ElMessage.error('文章标题不正确');
      return;
    }
    // TODO 调用接口删除文章
    try {
      const response = await $fetch('/api/article/' + tweet.value.id, {
        method: 'DELETE'
      });
      if (!response.success) {
        ElMessage.error(response.message);
      }
      if (response.success) {
        updateList();
        dialog.value = false;
        deleteTitle.value = '';
        ElMessage.success('删除成功');
      }
    } catch (error) {
      ElMessage.error(response.message);
      return;
    }
  };
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
  