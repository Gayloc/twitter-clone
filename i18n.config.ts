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
      checkEmailAndPassword: 'Please check your email and password',
      emailAndPasswordCantBeEmpty: 'Email and password cant be empty',
      fieldIsRequired: 'Field is required',
      username: 'Username',
      registerInfoCantBeEmpty: 'Register info cant be empty'
    },
    zh: {
      welcome: '你好',
      TwitterClone: '推特山寨版',
      loading: '加载中',
      login: '登录',
      register: '注册',
      email: '邮箱',
      password: '密码',
      checkEmailAndPassword: '邮箱或密码错误',
      emailAndPasswordCantBeEmpty: '邮箱和密码不能为空',
      fieldIsRequired: '该项为必填项',
      username: '用户名',
      registerInfoCantBeEmpty: '注册信息不能为空'
    }
  }
}))
