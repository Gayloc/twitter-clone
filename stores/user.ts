import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  id: number;
  email: string;
  userName: string;
  avatar: string;
  age: number;
}

export const useUserStore = defineStore(
  'user',
  () => {
      const Token = ref('');
    const setToken = (newToken: string) => {
        Token.value = newToken;
      };
    const getToken = () => {
        return Token.value;
      };
    const user = ref<User | null>(null);
    const setUser = (newUser: User) => {
        user.value = newUser;
      };
    const getUser = () => {
        return user.value;
      };
    const logout = () => {
        Token.value = '';
        user.value = null;
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
