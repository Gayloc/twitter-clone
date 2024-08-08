<template>
    <v-row class="d-flex justify-center">
        <v-col cols="12">
            <v-col 
            v-if="true" 
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
            articleList.value = response.articles;
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

const submit = () => {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('cover', cover.value);

    getList();
};
</script>