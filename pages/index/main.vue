<template>
    <v-row v-if="pageList" class="d-flex flex-wrap">
      <v-col
        cols="12"
        md="12">
      <WelcomeCard/>
      </v-col>
      <v-col 
        v-for="tweet in pageList" 
        :key="tweet.id"
        cols="12"
        md="4"
        >
        <TweetCard :tweet="tweet" />
      </v-col>
      <v-divider/>
      <v-row class="d-flex justify-center">
        <v-col cols="8" >
          <v-container class="max-width ">
            <v-pagination
            v-model="page"
            :length="length"
            class="my-4"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-row>
    <v-alert v-else type="info">{{ $t('loading') }}</v-alert>
</template>

<script setup>
import TweetCard from '~/components/TweetCard.vue';
import WelcomeCard from '~/components/WelcomeCard.vue';

const pageList = ref([]);
const page = ref(1);
const length = ref(1);

const getList = async () => {
  try {
    const response = await $fetch('/api/article/getList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: page.value,
        pageSize: 15
      })
    });
    if (!response.success) {
      ElMessage.error(response.message);
    }
    if (response.success) {
      pageList.value = response.articles.rows;
      length.value = Math.ceil((response.count + 1) / 15);
    }
  } catch (error) {
    ElMessage.error(response.message);
  }
};

watch(page, async () => {
  await getList();
});

onMounted(async () => {
  await getList();
});
</script>