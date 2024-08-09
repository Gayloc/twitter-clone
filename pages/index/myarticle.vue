<template>
    <v-row class="d-flex flex-wrap">
        <v-col cols="12">
            <v-col 
            v-if="articleList.length === 0" 
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
        </v-col>
        <v-col 
            v-for="tweet in articleList"
            :key="tweet.id"
            cols="12"
            md="4"
            >
                <MyArticleTweetCard :tweet="tweet" @update-list="getList()"/>
            </v-col>
        <v-divider/>
        <v-divider/>
        <v-card style="min-width: 100%;" variant="outlined">
            <v-card-title class="headline text-center">
                Publish Article
            </v-card-title>
            <v-col>
                <v-text-field
                v-model="title"
                :rules="titleRules"
                label="title"
                required
                />
                <ImgCard v-model:img="cover" />
            </v-col>
            <v-col cols="12">
                <div style="min-height: 30%;">
                    <QuillEditor 
                        v-model:content="content"
                        theme="snow"
                        style="min-height: 150px;"
                        content-type="html"
                    />
                </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
                <v-btn color="primary" class="mr-4" @click="submit">Submit</v-btn>
                <v-btn color="error" @click="reset">Reset</v-btn>
            </v-col>
        </v-card>
    </v-row>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const articleList = ref([]);

const getList = async () => {
    try {
        const response = await $fetch('/api/article/getMyArticleList', {
            method: 'GET'
        });
        if (!response.success) {
            ElMessage.error(response.message);
        }
        if (response.success) {
            articleList.value = response.articles.rows;
        }
    } catch (error) {
    ElMessage.error(response.message);
    }
};

getList();

const title = ref('');
const titleRules = [
  v => !!v || 'Title is required'
];
const content = ref('');
const cover = ref('');

const submit = async () => {
    console.log(title.value, content.value, cover.value);
    // 获取当前时间
    const currentTime = new Date();
    // 转换为时间戳
    const timestamp = currentTime.getTime();
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('cover', cover.value);
    formData.append('cre_time', timestamp);
    formData.append('author_name', userStore.user.userName);
    try {
        const response = await $fetch('/api/article/addArticle', {
            method: 'POST',
            body: formData
        });
        if (!response.success) {
            ElMessage.error(response.message);
        }
        if (response.success) {
            ElMessage.success('Article published successfully');
            getList();
        }
    } catch (error) {
        ElMessage.error(response.message);
    }
};

</script>