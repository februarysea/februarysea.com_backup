---
title: HTTP权威指南阅读笔记（一）
date: 2019-12-10 21:40:59
categories: 学习笔记
tags:
- computer network
---

本文是HTTP权威指南1-N章的读书笔记。

***

### URL与资源

##### URL语法

```html
<scheme>://<user>:<passowrd>@<host>:<port>/<path>;<params>?<query>#<frag>
```

HTTP默认端口为80，HTTPS为443。

##### URL编码

通过转译来表示不安全的字符，这里的安全是指URL的传输不能丢失信息。这种转译表示法包含一个百分号（%），后面跟着两个表示字符ASCII码的十六进制数。比如`%20`表示空格，还有一些字符被保留下来，不作编码。

##### 不同的传输方案

只列出了三种我平常遇到的方案，书上还写了mailto、rtsp(u)、file、news、telnet。

| 方案  |                描述                |
| :---: | :--------------------------------: |
| http  |         超文本传输协议方案         |
| https |      在http的基础上使用了SSL       |
|  ftp  | 文件传输协议，出现时间早于Web和URL |

这里具体记录一下http和https的区别。//TODO

| http | https |
| ---- | ----- |
|      |       |

### HTTP报文

