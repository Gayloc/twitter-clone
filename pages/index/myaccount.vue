<template>
    <v-card>
      <div class="text-center pa-4">
        <v-dialog
          v-model="dialog"
          max-width="400"
          persistent
        >
          <v-card
            text="在下边输入你的账户密码，确认删除你的账号。"
            title="确定要删除你的账号吗?"
          >
          <v-text-field 
            v-model="password"
            label="请输入密码"
            type="password"
            required
          />
            <template #actions>
              <v-spacer/>
              <v-btn @click="dialog = false">
                取消
              </v-btn>
              <v-btn @click="deleteUser">
                确认
              </v-btn>
            </template>
          </v-card>
        </v-dialog>
      </div>
    <v-sheet class="mx-auto">
      <v-form ref="form">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        />
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        />
        <v-select
          v-model="select"
          :items="ages"
          :rules="[v => !!v || 'Item is required']"
          label="Age"
          required
        />
        <avatar-page v-model:avatar="avatar"/>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        />
        <div class="d-flex flex-row justify-end">
          <v-btn
            class="mt-4"
            color="success"
            inline
            @click="validate"
          >
            Validate
          </v-btn>
  
          <v-btn
            class="mt-4"
            color="error"
            inline
            @click="reset"
          >
            Reset Form
          </v-btn>
  
          <v-btn
            class="mt-4"
            color="warning"
            inline
            @click="resetValidation"
          >
            Reset Validation
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
    <v-btn class="mt-4" color="error" @click="dialog = true">DELETE ACCOUNT</v-btn>
  </v-card>
  </template>
  <script setup>
  import { useUserStore } from '~/stores/user';
  const userStore = useUserStore();
  const dialog = ref(false);
  const password = ref('');
const form = ref(null);
  const name = ref(userStore.user.userName);
  const email = ref(userStore.user.email);
const avatar = ref(null);
const nameRules = ref( [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters'
]);
const emailRules = ref( [
    v => !!v || 'Email is required',
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email is invalid'
]);
const ages = ref(Array.from({ length: 100 }, (_, i) => i + 1));
const select = ref(userStore.user.age);
const checkbox = ref(false);
const validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        ElMessage.success('Form is valid!');
        // TODO 后端验证
      // ...
    } else {
        ElMessage.error('Form is invalid!');
    }
};
const reset = () => {
    form.value.reset();
    name.value = userStore.user.name;
    email.value = userStore.user.email;
    select.value = userStore.user.age;
    checkbox.value = false;
};
const resetValidation = () => {
  form.value.resetValidation();
  };
  const deleteUser = async () => {
    if (password.value === '') {
      ElMessage.error('请输入密码');
      return;
    }
    dialog.value = false;
    try {
      const res = await $fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password.value
        })
      });
      if (!res.success)
      {
        ElMessage.error(res.message);
        password.value = '';
      }
      if (res.success) {
        userStore.setUser(null);
        ElMessage.success('删除成功');
        password.value = '';
        navigateTo('/login');
      }
    } catch (error) {
      ElMessage.error('删除失败');
      password.value = '';
    }
};
  </script>