---
title: mac下使用Hexo在GitHub上搭建博客
date: 2019-06-07 15:56:01
categories: 项目记录
tags:
- hexo
---

#### 写在前面

之前是在vps上用Wordpress搭建的博客，用的是国外的vps，最近一大批IP被block了，我的也没能幸免，加之对之前的博客有种种不满意，索性拿GitHub Page 重新建立了一个博客。

#### 安装Hexo

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 [Markdown](http://daringfireball.net/projects/markdown/)（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

- 安装node.js

  我直接使用 `brew install -g node`在Mac OS下安装出现了一堆问题，于是转到node官网直接下载安装，很顺利地安装成功了。

  ```shell
  node -v
  v10.16.0
  npm -v
  6.9.0
  ```

  

- 安装git

  在macOS Mavericks （10.9） 或更高版本的系统中已经内置了git。确认一下，git确实已经安装。

  ```shell
  git --version 
  git version 2.20.1 (Apple Git-117)
  ```

  

- 安装Hexo

  把Hexo的依赖安装完成后就可以安装Hexo了。

  `sudo npm install -g hexo`

- 创建博客

  安装完成后，创建博客文件夹，用来存放自己的博客数据。进入blog文件夹中。

  ```shell
  mkdir blog
  cd blog
  ```

  使用如下命令初始化Hexo博客，安装npm。

  ```shell
  hexo init
  sudo npm install
  ```

  新建完成后，blog文件夹下的目录如下：

  ```shell
  .
  ├── _config.yml
  ├── package.json
  ├── scaffolds
  ├── source
  |   ├── _drafts
  |   └── _posts
  └── themes
  ```

  **_config.yml**

  网站的配置信息，可以在里面修改网页的大部分参数。需要注意的是该文件使用的是YAML/YML语言。

  >**YAML/YML语言**
  >
  >1. 大小写敏感
  >2. 使用缩进表示层级关系
  >3. 缩进时不允许使用Tab键，只允许使用空格。
  >4. 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可

  **package.json**

  应用程序的信息。[EJS](https://ejs.co/), [Stylus](http://learnboost.github.io/stylus/) 和 [Markdown](http://daringfireball.net/projects/markdown/) renderer 已默认安装，您可以自由移除。

  **scaffolds**

  模版文件夹。新建文章时，Hexo 会根据 scaffold 来建立文件。

  Hexo的模板是指在新建的markdown文件中默认填充的内容。例如，如果修改scaffold/post.md中的Front-matter内容，那么每次新建一篇文章时都会包含这个修改。

  **source**

  资源文件夹是存放用户资源的地方。除 `_posts` 文件夹之外，开头命名为 `_` (下划线)的文件 / 文件夹和隐藏的文件将会被忽略。Markdown 和 HTML 文件会被解析并放到 `public` 文件夹，而其他文件会被拷贝过去。

  **themes**

  主题文件夹。Hexo 会根据主题来生成静态页面。

- 使用如下命令生成静态文件并启动服务器。s

  ```shell
   hexo generate   # 可简写为 hexo g
   hexo server     # 可简写为 hexo s
  ```

  现在就可以在本地访问网页了，默认情况下网址为[http://localhost:4000](http://localhost:4000)。

#### 本地博客发布到GitHub上

登录GitHub后创建新的repository，名称为 `user.github.io`，必须使用自己的用户名。例如`februarysea.github.io`。

然后到blog文件夹下，编辑_config.yml文档。

```shell
vim _config.yml
```

将文档最下面的deploy`配置如下。repository将`februarysea`替换为自己的用户名。

```shell
deploy:
  type: git
  repository:
  https://github.com/februarysea/februarysea.github.io.git
  branch: master
```

然后生成静态文件，并上传到GitHub服务器。

```shell
hexo -g
hexo -deploy  # 可简写为 hexo -d
```

若未关联GitHub，执行`hexo d`时会提示输入GitHub账号用户名和密码，把自己的GitHub账号密码输进去就好了。

```shell
username for 'https://github.com':
password for 'https://github.com':
```

执行成功后就可以在[februarysea.github.io](februarysea.github.io)访问博客了，内容与http://localhost:4000相同。

#### 选择自己的域名关联GitHub Page

* 购买域名

  现在已经可以通过浏览器输入[februarysea.github.io](februarysea.github.io)来访问博客了，但是始终觉得这个域名太长了，一点也不好记，于是决定去买一个好记的域名来关联GitHub Page。进入阿里云的官网后，在搜索框输入域名，并点击域名注册，就可以看到域名查询界面。对于我来说，我仅仅是想要一个个性化的博客域名，所以域名的后缀足够酷就好了，不需追求顶级域名。需要注意的是有一些域名第一年注册很便宜，但是续费却比注册贵的多，购买的时候要看清楚。选择好之后一步步的付款就好了。

* 解析域名

  域名购买后，需要将它与GitHub Page关联。这时候就要用到域名解析。进入阿里云的控制台域名界面，可以看到刚刚购买的域名后面有一个解析，点击之后按如下填写，需要添加两个解析，使得网址前面有没有`www`都能访问。

  > 记录类型：CNAME
  > 主机记录：www
  > 解析线路：默认
  > 记录值：februarysea.github.io //这里替换成自己的网站
  > TTL: 10分钟

  > 记录类型：CNAME
  > 主机记录：@
  > 解析线路：默认
  > 记录值：februarysea.github.io //这里替换成自己的网站
  > TTL: 10分钟
  
  
  
* 将GitHub Page指向域名

  在`source`文件中添加`CNME`文件，并在`CNAME`中写入自己的域名`februarysea.com`，其它什么也不要写，
  ```shell
  cd source
  vim CNAME
  ```
  设置完成后执行渲染、部署。
  ```shell
  hexo g
  hexo d
  ```
  这样设置完成后，过一会儿就可以通过购买的域名访问自己的网站了。	

------

参考：[@谓之小一](https://zhuanlan.zhihu.com/p/34654952)
