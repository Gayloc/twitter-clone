<template>
    <v-card 
        class="pa-3 d-flex justify-end"
        style="color: white;"
        >
        <template #image>
            <v-img
                src="~/public/bk.png" 
                height="100%"
                cover
                position="50% 18%"
                />
        </template>
        <v-card-subtitle>
            <v-card-title> {{ hello }} </v-card-title>
            <v-card-text>现在是：{{ currentTime }}</v-card-text>
        </v-card-subtitle>
        <v-spacer/>
        <v-card-title class="d-flex align-center">
            看看有什么新鲜事？
        </v-card-title>
    </v-card>
</template>

<script setup>
const currentTime = ref('');
const hours = ref('');

// 方法：更新当前时间
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  hours.value = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${year}-${month}-${day} ${hours.value}:${minutes}:${seconds}`;
};

const hello = computed(() => {
    if (hours.value >= 6 && hours.value < 12) {
        return '早上好！';
    } else if (hours.value >= 12 && hours.value < 18) {
        return '下午好！';
    } else if (hours.value >= 18 && hours.value < 24) {
        return '晚上好！';
    } else {
        return '深夜了，注意休息！';
    }
});

// 生命周期钩子：组件挂载时启动定时器
let timer;
onMounted(() => {
  updateTime(); // 初始化时间显示
  timer = setInterval(updateTime, 1000);
});

// 生命周期钩子：组件销毁时清除定时器
onUnmounted(() => {
  clearInterval(timer);
});

</script>

<style scoped>
</style>