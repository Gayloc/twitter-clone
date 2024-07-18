<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="headline">{{ $t('register') }}</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="username" :label="$t('username')" :rules="[required]" autocomplete="username"/>
                            <v-text-field v-model="email" :label="$t('email')" :rules="[required]" autocomplete="email"/>
                            <v-text-field v-model="password" :label="$t('password')" type="password"
                                :rules="[required]" autocomplete="new-password"/>
                        </v-form>
                        <v-alert type="error" v-if="error != null">
                            {{ error }}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn color="primary" @click="register">{{ $t('register') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const { t } = useI18n()
const username = ref('')
const email = ref('');
const password = ref('');
const error = ref(null)
const router = useRouter()

const required = value => !!value || t('fieldIsRequired')

const register = async () => {
    if (email.value == '' || password.value == '') {
        error.value = t('registerInfoCantBeEmpty')
        return
    }

    try {
        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            })
        })

        if (!response.success) {
            throw { massage: response.message, statusCode: response.statusCode }
        }

        if (response.success) {
            router.push('/login')
        } else {
            error.value = response.message
        }

    } catch (err) {
        if (err.statusCode == 400) {
            error.value = t('emailExists')
        }
    }
}
</script>

<style scoped>
.headline {
    font-weight: bold;
}
</style>