<template>
    <div>
        {{ title }}
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
const { title } = toRefs(props);
</script>