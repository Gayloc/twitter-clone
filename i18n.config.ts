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
      registerInfoCantBeEmpty: 'Register info cant be empty',
      logout: 'Log out',
      changeAvatar: 'Change avatar',
      greeting: 'See what is here',
      emailExists: 'Email exists',
      upload: 'Upload',
      close: 'Close',
      inputImage: 'Input image',
      inputImageFirst: 'Input image first',
      noSelectedFile: 'No selected file',
      newTweet: 'New Tweet',
      $vuetify: {
        input: {
          prependAction: 'Add image',
          clear: 'Clear'
        }
      }
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
      registerInfoCantBeEmpty: '注册信息不能为空',
      logout: '退出登录',
      changeAvatar: '更改头像',
      greeting: '看看有什么新鲜事',
      emailExists: '邮箱已存在',
      upload: '上传',
      close: '关闭',
      inputImage: '上传一张图片',
      inputImageFirst: '请先上传一张图片',
      noSelectedFile: '未选择文件',
      newTweet: '新推文',
      $vuetify: {
        input: {
          prependAction: '添加图片',
          clear: '清除'
        }
      }
    }
  }
}))
