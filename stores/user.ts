import { defineStore } from 'pinia';
import { ref } from 'vue';

// 用户接口
interface User {
  id: number;
  email: string;
  userName: string;
  avatar: string;
  age: number;
}

// 点赞列表接口
interface userLike {
  user_id: number;
  like_id: number;
}

interface userLikeList {
  rows: userLike[];
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
    const likeList = ref<userLikeList | null>(null);
    const setLikeList = (newLikeList: userLikeList) => {
        likeList.value = newLikeList;
      };
    const getLikeList = () => {
        return likeList.value;
      };
    return {
      Token,
      setToken,
      getToken,
      user,
      setUser,
      getUser,
      logout,
      likeList,
      setLikeList,
      getLikeList
    };
  },
  {
    persist: true
  }
);
