<template>
  <v-card image="/card-image.jpg" class="d-flex justify-space-between align-center card">
    <v-avatar size="200">
      <v-img cover :src='src'/>
    </v-avatar>
    <v-card-actions>
      <v-btn text color="yellow-lighten-2" @click="sheet = !sheet">{{ $t('changeAvatar') }}</v-btn>
    </v-card-actions>
  </v-card>
  <v-bottom-sheet v-model="sheet" inset>
    <v-card class="text-center card">
      <v-card-text>
        <v-file-input
          v-model="file" :label="$t('inputImage')" accept="image/*"
          prepend-icon="mdi-camera"/>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="submit">{{ $t('upload') }}</v-btn>
        <v-btn text @click="sheet = !sheet">{{ $t('close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" prepend-icon="mdi-update" :text="$t('inputImageFirst')" :title="$t('noSelectedFile')">
      <template #actions>
        <v-btn class="ms-auto" text="Ok" @click="dialog = false"/>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  user: String()
});
const src = ref('/icon.png')
const sheet = ref(false)
const file = ref(null)
const dialog = ref(null)

const submit = async () => {
  if (file.value) {
    const formData = new FormData()
    formData.append('file', file.value)

    try {
      await $fetch('/api/avatar/upload/' + props.user.user_id, {
        method: 'POST',
        body: formData,
      })
      sheet.value = false
      updateAvatar()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  } else {
    dialog.value = true
  }
}

const updateAvatar = async () => {
  try {
    const data = await $fetch('/api/avatar/' + props.user.user_id);
    src.value = data.data+ '?t=' + new Date().getTime();
  } catch (err) {
    console.log(err)
  }
}

onMounted(updateAvatar);

</script>

<style scoped>
.card {
  padding: 10px;
}
</style>