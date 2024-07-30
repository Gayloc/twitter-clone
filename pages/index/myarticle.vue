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
        <v-col>
            <v-text-field
            v-model="title"
            :rules="titleRules"
            label="title"
            required
            />
        </v-col>
        <v-col cols="12">
            <div style="min-height: 30%;">
                <QuillEditor 
                    v-model:content="content"
                    theme="snow"
                    style="min-height: 150px;"
                />
            </div>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
            <v-btn color="primary" class="mr-4" @click="submit">Submit</v-btn>
            <v-btn color="error" @click="reset">Reset</v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const title = ref('');
const titleRules = [
  v => !!v || 'Title is required'
];
const content = '';
</script>