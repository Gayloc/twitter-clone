// user.ts
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

// 点赞列表接口
interface userLikeList {
  rows: userLike[];
}

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户token
      const Token = ref('');
    const setToken = (newToken: string) => {
        Token.value = newToken;
    };
    
    // TODO 获取Token信息
    const getToken = () => {
        return Token.value;
    };
    
    // 用户信息
    const user = ref<User | null>(null);
    const setUser = (newUser: User) => {
        user.value = newUser;
    };

    // TODO 获取用户信息
    const getUser = () => {
        return user.value;
    };
    
    // TODO 退出登录
    const logout = () => {
        Token.value = '';
        user.value = null;
    };

    // 点赞列表
    const likeList = ref<userLikeList | null>(null);
    const setLikeList = (newLikeList: userLikeList) => {
        likeList.value = newLikeList;
    };
    
    // TODO 获取点赞列表
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
