# Twitter Clone
![icon](./public/icon.png)<br/>
推特山寨版

## 部署
```shell
npm install
npm run build
node ./.optput/server/index.mjs
```
默认开放端口为`3000`
## 技术栈
- [nuxt3](https://nuxt.com/)
- [nitro](https://nitro.unjs.io/)
- [vue](https://vuejs.org/)
- [vuetify](https://vuetifyjs.com/zh-Hans/)
- [Vuetify Nuxt Module](https://vuetify-nuxt-module.netlify.app/)
- [sidebase/nuxt-auth](https://sidebase.io/nuxt-auth/getting-started)
- [vueuse](https://vueuse.org/)
- [colorMode](https://color-mode.nuxtjs.org/)
- [vuei18n](https://vue-i18n.intlify.dev/)
- [mdi](https://pictogrammers.com/library/mdi/)
- [nuxt/i18n](https://i18n.nuxtjs.org/)

## 功能需求

### 用户管理
- [x] 登陆
- [x] 注册
- [x] 注销
- [x] 用户资料
    - [x] 头像
    - [x] 邮箱
    - [x] 名称
    - [x] id
- [ ] 关注
- [ ] 粉丝
- [ ] 修改用户资料

### 推文管理
- [x] 发布
- [ ] 删除
- [ ] 修改
- [x] 评论
- [x] 点赞
- [ ] 获取推荐

### 推文组成
- [x] 正文
- [x] 多媒体
    - [x] 图片
    - [x] 视频
- [x] 评论区
- [ ] 相关数据
    - [x] 喜欢
    - [ ] 转发
  
### 杂项小功能
- [x] 深色模式主题切换