---
title: 个人博客更换主题icarus过程记录
date: 2020-02-15 23:57:42
categories: 项目记录
tags:
- Hexo
---

### 写在前面

我的博客之前使用的[yilia](https://github.com/litten/hexo-theme-yilia)主题，但这个主题已经很久没有维护了，偶然在Github上闲逛发现了优雅的[icarus](https://github.com/ppoffice/hexo-theme-icarus)主题，主题特别酷，也一直在维护，于是我便计划更换主题。下面是整个过程的记录。整个配置过程还参考了[@辣椒の酱](https://removeif.github.io/friend/)的博客配置、[@Evan](https://nave.work/)的博客。

### 基本配置

icarus主题是支持多语言的，默认是英语，所以在配置主题的`_config.yml`之前需要把自己博客目录下的`_config.yml`更改:

```yml
language: zh-CN
```

接下来就是主题的`_config.yml`：

`donate`功能如果不用需要直接从`_config.yml`删除，如果只是注释掉会报错。

```yaml
# Version of the Icarus theme that is currently used
version: 2.6.0
# Path or URL to the website's icon
favicon: /images/logo.png
# Additional HTML meta tags in an array.
meta: 
# canonical_url of your site
canonical_url: 
# Path or URL to RSS atom.xml
rss: 
# Path or URL to the website's logo to be shown on the left of the navigation bar or footer
logo: /images/logo.png
# Open Graph metadata
# https://hexo.io/docs/helpers.html#open-graph
open_graph:
    # Facebook App ID
    fb_app_id: 
    # Facebook Admin ID
    fb_admins: 
    # Twitter ID
    twitter_id: 
    # Twitter site
    twitter_site: 
    # Google+ profile link
    google_plus: 
# Navigation bar link settings
navbar:
    # Navigation bar menu links
    menu:
        首页: /
        归档: /archives
        分类: /categories
        标签: /tags
    # Navigation bar links to be shown on the right
    # links:
        # Download on GitHub:
            # icon: fab fa-github
            # url: 'https://github.com/ppoffice/hexo-theme-icarus'
# Footer section link settings
footer:
    # Links to be shown on the right of the footer section
    links:
        Creative Commons:
            icon: fab fa-creative-commons
            url: 'https://creativecommons.org/'
        Attribution 4.0 International:
            icon: fab fa-creative-commons-by
            url: 'https://creativecommons.org/licenses/by/4.0/'
        Download on GitHub:
            icon: fab fa-github
            url: 'https://github.com/ppoffice/hexo-theme-icarus'
# Article display settings
article:
    # Code highlight settings
    highlight: 
        # Code highlight themes
        # https://github.com/highlightjs/highlight.js/tree/master/src/styles
        theme: github
        # Show code copying button
        clipboard: true
        # Default folding status of the code blocks. Can be "", "folded", "unfolded"
        fold: unfolded
    # Whether to show article thumbnail images
    thumbnail: false
    # Whether to show estimate article reading time
    readtime: true
# Search plugin settings
# https://ppoffice.github.io/hexo-theme-icarus/categories/Plugins/Search
search:
    # Name of the search plugin
    type: insight
# Comment plugin settings
# https://ppoffice.github.io/hexo-theme-icarus/categories/Plugins/Comment
comment:
    type: valine
    app_id: xxxxx           # (required) LeanCloud application id
    app_key: xxxx           # (required) LeanCloud application key
    notify: false           # (optional) receive email notification
    verify: true            # (optional) show verification code
    placeholder: 欢迎交流♂   # (optional) comment box placeholder text

# Share plugin settings
# https://ppoffice.github.io/hexo-theme-icarus/categories/Plugins/Share
share:
    # Share plugin name
    type: 
# Sidebar settings.
# Please be noted that a sidebar is only visible when it has at least one widget
sidebar:
    # left sidebar settings
    left:
        # Whether the left sidebar is sticky when page scrolls
        # https://ppoffice.github.io/hexo-theme-icarus/Configuration/Theme/make-a-sidebar-sticky-when-page-scrolls/
        sticky: true
    # right sidebar settings
    right:
        # Whether the right sidebar is sticky when page scrolls
        # https://ppoffice.github.io/hexo-theme-icarus/Configuration/Theme/make-a-sidebar-sticky-when-page-scrolls/
        sticky: true
# Sidebar widget settings
# https://ppoffice.github.io/hexo-theme-icarus/categories/Widgets/
widgets:
    -
        # Widget name
        type: profile
        # Where should the widget be placed, left or right
        position: left
        # Author name to be shown in the profile widget
        author: "februarysea"
        # Title of the author to be shown in the profile widget
        author_title: "目标是神奇宝贝大师！"
        # Author's current location to be shown in the profile widget
        location: "Shanghai"
        # Path or URL to the avatar to be shown in the profile widget
        avatar:  "images/back.jpg"
        # Email address for the Gravatar to be shown in the profile widget
        gravatar: 
        # Whether to show avatar image rounded or square
        avatar_rounded: false
        # Path or URL for the follow button
        follow_link: 'mailto:februarysea@outlook.com'
        # Links to be shown on the bottom of the profile widget
        social_links:
            Github:
                icon: fab fa-github
                url: 'https://github.com/februarysea'
            # Facebook:
                # icon: fab fa-facebook
                # url: 'https://facebook.com'
            Twitter:
                icon: fab fa-twitter
                url: 'https://twitter.com/Hunk2333'
            Weibo:
                icon: 'fab fa-weibo'
                url: 'https://weibo.com/u/7097601356'
            Instagram:
                icon: 'fab fa-instagram'
                url: 'https://www.instagram.com/hunk233/'
            # Dribbble:
                # icon: fab fa-dribbble
                # url: 'https://dribbble.com'
            # RSS:
                # icon: fas fa-rss
                # url: /
    -
        # Widget name
        type: toc
        # Where should the widget be placed, left or right
        position: right
    -
        # Widget name
        type: links
        # Where should the widget be placed, left or right
        position: left
        # Links to be shown in the links widget
        links:
            PPOffice: 'https://github.com/ppoffice'
            辣椒の酱 : 'https://removeif.github.io/'
            
    -
        # Widget name
        type: category
        # Where should the widget be placed, left or right
        position: right
    -
        # Widget name
        type: tagcloud
        # Where should the widget be placed, left or right
        position: right
    # -
        # Widget name
        # type: recent_posts
        # Where should the widget be placed, left or right
        # position: right
    -
        # Widget name
        type: archive
        # Where should the widget be placed, left or right
        position: right
    -
        # Widget name
        type: tag
        # Where should the widget be placed, left or right
        position: right
# Other plugin settings
plugins:
    # Enable page animations
    animejs: true
    # Enable the lightGallery and Justified Gallery plugins
    # https://ppoffice.github.io/hexo-theme-icarus/Plugins/General/gallery-plugin/
    gallery: true
    # Enable the Outdated Browser plugin
    # http://outdatedbrowser.com/
    outdated-browser: true
    # Enable the MathJax plugin
    # https://ppoffice.github.io/hexo-theme-icarus/Plugins/General/mathjax-plugin/
    mathjax: true
    # Show the back to top button on mobile devices
    back-to-top: true
    # Google Analytics plugin settings
    # https://ppoffice.github.io/hexo-theme-icarus/Plugins/General/site-analytics-plugin/#Google-Analytics
    google-analytics:
        # Google Analytics tracking id
        tracking_id: 
    # Baidu Analytics plugin settings
    # https://ppoffice.github.io/hexo-theme-icarus/Plugins/General/site-analytics-plugin/#Baidu-Analytics
    baidu-analytics:
        # Baidu Analytics tracking id
        tracking_id: 
    # Hotjar user feedback plugin
    # https://ppoffice.github.io/hexo-theme-icarus/Plugins/General/site-analytics-plugin/#Hotjar
    hotjar:
        # Hotjar site id
        site_id: 
    # Show a loading progress bar at top of the page
    progressbar: true
    # BuSuanZi site/page view counter
    # https://busuanzi.ibruce.info
    busuanzi: true
# CDN provider settings
# https://ppoffice.github.io/hexo-theme-icarus/Configuration/Theme/speed-up-your-site-with-custom-cdn/
providers:
    # Name or URL of the JavaScript and/or stylesheet CDN provider
    cdn: jsdelivr
    # Name or URL of the webfont CDN provider
    fontcdn: google
    # Name or URL of the webfont Icon CDN provider
    iconcdn: fontawesome
```

### 评论功能

icarus内置了多款评论插件，本来最初使用的是`gitalk`，但它实际上是通过GitHub的`issuse`来存储评论数据，而且每写一篇新文章还必须自己手动初始化（虽然有自动化的文章但用的语言我不是很熟悉就没细看）。其他的评论系统有好有坏，最后选择了`Valine`。以下内容摘自[https://valine.js.org/](https://valine.js.org/)

>如果你想在某个网页或者文章页中使用Valine，请参照以下步骤配置
>
>## 获取APP ID 和 APP Key
>
>请先[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) `LeanCloud`, 进入[控制台](https://leancloud.cn/dashboard/applist.html#/apps)后点击左下角[创建应用](https://leancloud.cn/dashboard/applist.html#/newapp)：
>
>![](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)
>
>应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`，然后就能看到你的`APP ID`和`APP Key`了：
>
>![](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)
>
>## 评论数据管理
>
>由于Valine 是无后端评论系统，所以也就没有开发评论数据管理功能。请自行登录`Leancloud应用`管理。  
>
>具体步骤：`登录`>`选择你创建的应用`>`存储`>选择Class `Comment`，然后就可以尽情的发挥你的权利啦(～￣▽￣)～
>
>> 当然，你也可以配合 [@panjunwen](https://github.com/panjunwen) 开发的 [Valine-Admin](https://github.com/panjunwen/Valine-Admin) 进行`评论数据管理`
>
>## 安全域名
>
>为了你的数据安全，请设置自己的`安全域名`：
>
>![设置安全域名](https://i.loli.net/2019/06/21/5d0c995bddd4f99219.jpg)
>
>
>更多信息请查看[配置项](/configuration.html)。

配置完成后在icarus主题下的`_config.yml`填写相应配置就ok。

```yaml
comment:
    type: valine
    app_id: xxxxx           # (required) LeanCloud application id
    app_key: xxxx           # (required) LeanCloud application key
    notify: false           # (optional) receive email notification
    verify: true            # (optional) show verification code
    placeholder: 欢迎交流♂   # (optional) comment box placeholder text

```

### 相册功能

本来一直期待自己的博客应该有一个相册，但是实际上设置好相册功能之后发现图片加载特别慢，所以放弃了。但是还是记录下如何设置。

Icarus内置了相册功能，只需要把`_config.yml`作如下设置：

```yaml
    gallery: true
```

然后就可以编辑相册页面了。其实就是`md`格式的静态页面，需要自己手动添加照片。类似下面这样。

```markdown
---
date: 2019-07-29 16:28:26

---

> **2020**

<div class="justified-gallery">

![长久](../images/long.jpg)
![海鸥](../images/seagull.jpg)
![树们](../images/trees.jpg)
![浮生](../images/life.jpg)
![黄与蓝](../images/yellowAndBlue.jpg)
</div>

<br>

> **2019**

<div class="justified-gallery">


![东京与富士山](../images/fuji.jpg)
![东京塔](../images/tokyoTower.jpg)
![海岸](../images/sea.jpg)
![永远](../images/forever.jpg)
![秋天](../images/autumn.jpg)
![行人](../images/walker.jpg)
![红色](../images/red.jpg)
![轨迹](../images/track.jpg)
![光](../images/light.jpg)
![老人们](../images/theOlders.jpg)
</div>

<br>
```

### 及时聊天功能

参考自[@Evan]([https://nave.work/Hexo%E4%B8%BB%E9%A2%98%E6%8A%98%E8%85%BE%E6%97%A5%E8%AE%B0-%E4%BA%8C-%E6%B7%BB%E5%8A%A0%E8%B1%86%E7%93%A3%E5%92%8C%E8%81%8A%E5%A4%A9%E6%8F%92%E4%BB%B6.html](https://nave.work/Hexo主题折腾日记-二-添加豆瓣和聊天插件.html))

1. 首先需要注册 [Tidio](https://www.tidio.com/) 账号，根据引导填写应用信息。

2. 在个人主页中选择 `Channels -> Live Chat -> Integration` ,复制 JS 代码[![img](https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/screenshot%202019-11-17%20at%2020.37.55.png)](https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/screenshot 2019-11-17 at 20.37.55.png)

3. 修改 /layout/layout.ejs, 在文件最后插入对应的代码.

   ```html
       <% } %>
   +    <script src="//code.tidio.co/token.js" async></script>
   </body>
   </html>
   ```

   其中将`token`替换成你对应的token即可，接下来可以在 Tidio 控制台的 `Channel -> Live chat -> Appearance` 中根据提示定制聊天对话框的主题外观和语言包，以适应自己的需求。

 