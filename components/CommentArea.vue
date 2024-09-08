<template>
    <v-alert v-if="error != null" type="error">
        {{ error }}
    </v-alert>
    <v-card-text v-if="comments.length == 0">{{ $t('noComments') }}</v-card-text>
    <div v-else-if="ready">
        <v-card
            v-for="(comment, index) in comments" :key="comment.comment_id" :prepend-avatar="avatars[index]"
            :title="users[index].username"
            :subtitle="moment.utc(comment.created_at).tz(userTimeZone).format('YYYY-MM-DD HH:mm:ss')" :variant="'flat'">
            <template #append>
                <v-card-actions>
                    <v-btn :href="`mailto:${users[index].email}?subject=Re:${comment.content}`">email</v-btn>
                    <v-btn>profile</v-btn>
                </v-card-actions>
            </template>
            <v-card-text>
                {{ comment.content }}
            </v-card-text>
        </v-card>
        <v-pagination v-model="currentPage" :length="pageCount"/>
    </div>
</template>

<script setup>
import moment from 'moment-timezone';

const props = defineProps(['tweetId']);
const error = ref(null)
const comments = ref([])
const users = ref([])
const avatars = ref([])
const ready = ref(false)
const currentPage = ref(1)
const pageCount = ref(1)

const updateComments = async () => {
    ready.value = false
    try {
        const data = await $fetch(`/api/comment/order_by_time/${props['tweetId']}?page=${currentPage.value}`)
        if (!data.success) {
            throw createError(data.message)
        }

        pageCount.value = data.maxPages
        comments.value = data.data
        const userPromises = comments.value.map(comment => $fetch(`/api/user/${comment.user_id}`))
        const avatarPromises = comments.value.map(comment => $fetch(`/api/avatar/${comment.user_id}`))

        const usersData = await Promise.all(userPromises)
        const avatarsData = await Promise.all(avatarPromises)

        users.value = usersData.map(userResponse => userResponse.user)
        avatars.value = avatarsData.map(avatarResponse => avatarResponse.data)

        ready.value = true
    } catch (err) {
        error.value = err.message || err
    }
}

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

watch(currentPage, updateComments)

onMounted(updateComments)

defineExpose({ updateComments })
</script>
