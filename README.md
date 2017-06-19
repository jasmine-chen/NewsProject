-------------
## 仿新闻平台（React + Webpack）
-------------

> 该平台参考了“网易新闻”的站点设计风格， 采用 React、React Router、Webpack 以及 npm 进行开发，并且采用了媒体查询技术，使平台的所有模块可以同时适配 PC 端和移动端。

### 主要功能一览

- 注册登录

根据后端接口规则，提交注册信息，完成用户注册功能；注册成功后，可以在登录页面进行登录。

可以使用以下已经注册号的账号和密码进行测试：

账号：jasmine

密码：123

PC 端和移动端的该功能页面如下：

![登录注册页面](https://ooo.0o0.ooo/2017/06/17/5944ce29977e7.png)

- 首页

![首页](https://ooo.0o0.ooo/2017/06/17/5944d223ba5a2.png)

- 新闻详情页

点击首页的新闻链接后，可以进入新闻详情页，查看单条新闻的详细情况。

![详情页](https://ooo.0o0.ooo/2017/06/17/5944d6e4964eb.png)

- 评论和收藏

在详情页的下方有提交评论和收藏文章的功能，登录后可以进行评论和收藏，并且可以在个人中心查看评论和收藏的情况。

![](https://ooo.0o0.ooo/2017/06/17/5944d84e01ad6.png)

- 用户个人中心

在用户中心可以查看用户收藏的文章信息，评论情况以及添加修改头像。

![](https://ooo.0o0.ooo/2017/06/17/5944d9e877e45.png)

### 技术实现
- 采用 React 进行多组件嵌套以及组件的复用。
- 利用 React Router 实现参数的传递和页面的跳转。
- 主要采用 Ant Design 样式框架进行页面的整体布局和美化。
- 利用 fecth 组件进行网络请求，获取后台接口数据。
- 利用 webpack 对资源管理打包，进行开发和生产环境的转换。

### 平台支持
1. 平台的后台支持采用的是公共免费的新闻测试接口，具体如下:

 - [获取新闻列表](http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=top&count=10)
 - [新闻添加评论](http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=1&uniquekey=123&commnet=content)
 - [收藏新闻](http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=1&uniquekey=123)
 - [注册登录接口](http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName=r_userName&r_password=r_password&r_confirmPassword=r_confirmPassword)
 - [获取用户收藏](http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=1)
 - [获取用户发出的评论](http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=1)

2. 平台中首页的“新闻各有态度”版块，是仿照“网易新闻”相关版块构建的，资源也采用了“网易新闻”中的相关资源，仅是用于学习练习，在此说明。

### 预览与源码使用

1. 网页可以点此[预览](https://jasmine-chen.github.io/NewsProject/dist)

  **注：**由于预览借助的是 GitHubPages ，可能需要借助翻墙。并且在预览时，如果页面加载不完全，请**暂时解除浏览器的连接不安全保护**，因为 GitHubPages 使用的是 https 协议，通过其访问项目页面会出现混合内容的情况，浏览器可能会阻止混合内容以避免被攻击，导致页面加载不完全。

2. 源码 dist 文件夹中是已经生产打包的所有文件，单独下载 dist 文件夹，打开 index.html 可以实现本地预览。

3. 若需要对源码开发调试，需将仓库 clone, 利用 `npm install` 进行包安装才可使用。

4. 目前该平台适配了 Chrome，FireFox, Edge，IE10+ 浏览器，请先采用这些浏览器进行开发预览。
