export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      welcome: 'Welcome',
      TwitterClone: 'Twitter Clone',
      loading: 'Loading',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      loginFirstError: 'Please login first'
    },
    zh: {
      welcome: '你好',
      TwitterClone: '推特山寨版',
      loading: '加载中',
      login: '登录',
      register: '注册',
      email: '邮箱',
      password: '密码',
      loginFirstError: '请先登录'
    }
  }
}));
