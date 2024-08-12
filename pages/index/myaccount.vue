<!-- myaccount.vue -->
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
  // 导入用户设置
  import { useUserStore } from '~/stores/user';
  const userStore = useUserStore();

  // 验证是否要注销账户
  const dialog = ref(false);

  // 定义表单数据
  const password = ref('');
const form = ref(null);
  const name = ref(userStore.user.userName);
  const email = ref(userStore.user.email);
  const avatar = ref(null);

  // 用户名验证
const nameRules = ref( [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters'
]);

// 邮箱验证
const emailRules = ref( [
    v => !!v || 'Email is required',
    v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email is invalid'
]);

// 年龄下拉框
  const ages = ref(Array.from({ length: 100 }, (_, i) => i + 1));

  // 定义选择数据
  const select = ref(userStore.user.age);

  // 定义复选框数据，确认修改
  const checkbox = ref(false);

  // TODO 获取用户信息
  const setUserStore = async () => {
    // TODO 获取用户信息
  const response =
      await $fetch('/api/user/getUserInfo');
    // TODO 成功操作
  if (response.success) {
    userStore.setUser(response.userIn);
    ElMessage.success(response.message);
  }
  // TODO 失败操作
  if (!response.success) {
    ElMessage.error(response.message);
  }
  };

  // TODO 提交表单
  const validate = async () => {
  // TODO 验证表单
    const { valid } = await form.value.validate();
    if (valid) {
      // TODO 表单验证成功操作
      ElMessage.success('Form is valid!');

      // TODO 包装FormData信息
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('email', email.value);
      formData.append('age', select.value.toString());
      formData.append('avatar', avatar.value);

      // TODO 发送请求
      try {
        const res = await $fetch('/api/user/update', {
        method: 'PUT',
        body: formData
        });
        if (!res.success) {
          ElMessage.error(res.message);
        }
        if (res.success) {
          ElMessage.success(res.message);
          setUserStore();
        }
      } catch (error) {
        ElMessage.error(res.message);
      }
    } else {
        ElMessage.error('Form is invalid!');
    }
  };

  // TODO 重置表单
const reset = () => {
    form.value.reset();
    name.value = userStore.user.name;
    email.value = userStore.user.email;
    select.value = userStore.user.age;
    checkbox.value = false;
  };

  // TODO 重置表单验证
const resetValidation = () => {
  form.value.resetValidation();
  };

  // TODO 删除账户
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