<!-- mylike.vue -->
<template>
    <v-row v-if="pageList" class="d-flex flex-wrap">
      <v-col
        cols="12"
        md="12">
      <WelcomeCard/>
      </v-col>
      <v-col 
            v-if="filterPageList.length === 0" 
            cols="16" 
            md="12" 
            lg="6" 
            style="min-width: 100%">
                <v-empty-state
                headline="No Messages Yet"
                text="You haven't received any messages yet.
                When you do, they'll appear here."
                title="Check back later."
                @click:action="onClickAction"
                />
            </v-col>
      <v-col 
        v-for="(tweet) in filterPageList" 
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
import { useUserStore } from '~/stores/user';

onMounted(async () => {
  await getList();
});

const userStore = useUserStore();
const pageList = ref([]);
const page = ref(1);
const length = ref(1);
const filterPageList = ref([]);

const likeList = computed(() => {
  return userStore.likeList.map(item => item.like_id);
});
watch(pageList, () => {
  filterPageList.value = pageList.value.filter(item => likeList.value.includes(item.id));
});

const getList = async () => {
  try {
    const response = await $fetch('/api/article/getList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: page.value,
        pageSize: 150
      })
    });
    if (!response.success) {
      ElMessage.error(response.message);
    }
    if (response.success) {
      pageList.value = response.articles.rows;
      length.value = Math.ceil((response.count + 1) / 150);
    }
  } catch (error) {
    ElMessage.error(response.message);
  }
};

watch(page, async () => {
  await getList();
});
</script>