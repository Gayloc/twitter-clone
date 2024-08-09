<template>
    <div>
        {{ title }}
    </div>
</template>

<script lang="ts" setup>
// TODO 从父组件获取评论标题
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
const { title } = toRefs(props);
</script>