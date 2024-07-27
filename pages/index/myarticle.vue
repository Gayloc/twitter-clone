<template>
    <v-row class="d-flex justify-center">
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

const content = '';
</script>