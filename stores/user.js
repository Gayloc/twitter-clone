import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore(
  'user',
  () => {
      const Token = ref('');
      const setToken = (token) => {
          Token.value = token;
      };
      const getToken = () => {
          return Token.value;
      };
      const user = ref([]);
      const setUser = (event) => {
          user.value = event;
      };
      const getUser = () => {
          return user.value;
    };
    const logout = () => {
        setToken('');
        setUser('');
      };
    return {
      Token,
      setToken,
      getToken,
      user,
      setUser,
      getUser,
      logout
    };
  },
  {
    persist: true
  }
);
