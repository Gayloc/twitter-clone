<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn class="button">
                    {{ $t('MediaSelector') }}
                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in items" :key="index" :value="index"
                                @click="selectedMedia = index">
                                <v-list-item-title>{{ item }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>

                <v-file-input
                    v-if="selectedMedia == 1" v-model="imageFiles" :label="$t('uploadImages')" accept="image/*"
                    multiple @change="handleFileChange"/>
                <v-file-input
                    v-if="selectedMedia == 2" v-model="videoFile" :label="$t('uploadvideo')"
                    accept="video/*"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const imageFiles = ref([])
const handleFileChange = () => {
    console.log(imageFiles)
};

const videoFile = ref(null)

const { t } = useI18n()
const items = ref([
    t('none'),
    t('images'),
    t('video')
])

const selectedMedia = ref(0)

const upload = async (tweet_id) => {
    if (selectedMedia.value == 0) {
        return
    } else if (selectedMedia.value == 1) {
        if (imageFiles.value.length == 0) {
            return
        }

        const formData = new FormData();

        imageFiles.value.forEach(file => {
            formData.append('file', file);
        });

        try {
            const response = await $fetch(`/api/media/upload/images/${tweet_id}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            successMessage.value = 'Upload successful!';
            errorMessage.value = '';
            console.log('Upload successful:', result);
        } catch (error) {
            errorMessage.value = 'Error uploading files!';
            successMessage.value = '';
            console.error('Error uploading files:', error);
        }
    } else {
        if (!videoFile.value) {
            return
        }
        const formData = new FormData()
        formData.append('file', videoFile.value)
        try {
            await $fetch(`/api/media/upload/video/${tweet_id}`, {
                method: 'POST',
                body: formData,
            })
        } catch (error) {
            console.error('Upload failed:', error)
        }
    }
}

defineExpose({ upload })
</script>

<style scoped>
.button {
    margin-bottom: 20px
}
</style>