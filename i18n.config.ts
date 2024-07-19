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
      MediaSelector: 'Media selector',
      newTweetEdit: 'Edit new tweet',
      content: 'Content',
      post: 'Post',
      uploadImages: 'Upload images',
      uploadvideo: 'Upload Video',
      none: 'None',
      images: 'Images',
      video: 'Video',
      joinTime: 'Join time',
      noTweets: 'No Tweets. Post One!',
      postComment: 'Post Comment',
      noComments: 'No Comments. Post one!',
      commentAreaTitle: 'Comments',
      loginFirst: 'Login first',
      inputComments: 'Input your comment',
      $vuetify: {
        input: {
          prependAction: 'Add image',
          clear: 'Clear'
        },
        carousel: {
          ariaLabel: {
            delimiter: 'image {0}/{1}'
          },
          prev: 'Previous',
          next: 'Next'
        },
        pagination: {
          ariaLabel: {
            next: 'Next',
            currentPage: 'Current Page',
            page: 'Page',
            root: 'Root',
            previous: 'Previous'
          }
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
      MediaSelector: '选择附件类型',
      newTweetEdit: '编辑推文',
      content: '内容',
      post: '发布',
      uploadImages: '上传图片',
      uploadvideo: '上传单个视频',
      none: '无',
      images: '图片',
      video: '视频',
      joinTime: '注册时间',
      noTweets: '还没有推文，快发布一个吧！',
      postComment: '发送评论',
      noComments: '没有评论，发一条吧！',
      commentAreaTitle: '评论',
      loginFirst: '请先登录',
      inputComments: '输入你的点评',
      $vuetify: {
        input: {
          prependAction: '添加图片',
          clear: '清除'
        },
        carousel: {
          ariaLabel: {
            delimiter: '幻灯片 {0}/{1}'
          },
          prev: '上一个',
          next: '下一个'
        },
        pagination: {
          ariaLabel: {
            next: '下一页',
            currentPage: '当前页',
            page: '页',
            root: '根',
            previous: '上一页'
          }
        }
      }
    }
  }
}))
