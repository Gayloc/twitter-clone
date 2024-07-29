<template>
    <v-container>
            <v-avatar
              size="150"
              class="avatar-upload"
              color="grey lighten-2"
              @click="triggerFileInput"
            >
              <v-file-input
                ref="fileInput"
                v-model="avatar"
                label=""
                prepend-icon="mdi-camera"
                accept="image/*"
                style="display: none;"
                @change="onFileChange"
              />
              <template v-if="avatarPreview">
                <img :src="avatarPreview" alt="Avatar Preview" class="avatar-image">
              </template>
              <template v-else>
                <v-icon large>mdi-camera</v-icon>
                <div>Upload Avatar</div>
              </template>
            </v-avatar>
    </v-container>
  </template>
  
  <script setup>
import { ref } from 'vue';
const avatar = defineModel('avatar', ref(null));
const avatarPreview = ref(null);
const fileInput = ref(null);
const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        avatar.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarPreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};
const triggerFileInput = () => {
    fileInput.value.click();
};

  </script>
  
  <style>
  .avatar-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
  }

  .avatar-upload input[type="file"] {
    display: none;
  }
  
  .avatar-upload .v-avatar__image {
    object-fit: cover;
  }
  
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  