<template>
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
  </template>
  <script setup>
  import { useUserStore } from '~/stores/user';
  const userStore = useUserStore();
const myUser = userStore.getUser();
const form = ref(null);
  const name = ref(userStore.user.name);
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
      myUser.name = name.value;
      myUser.email = email.value;
      myUser.age = select.value;
      console.log(avatar.value);
        userStore.setUser(myUser);
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
  </script>