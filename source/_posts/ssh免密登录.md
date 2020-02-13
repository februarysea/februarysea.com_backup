---
title: ssh免密登录
date: 2019-06-12 15:48:04
categoies: 学习笔记
tags: 
- linux
---

### 写在前面

> There were 2290 failed login attempts since the last successful login.

本来打算使用购买的云服务器直接开始Linux的学习，这次登录上我的云服务器发现了这个提醒，感觉我的服务器非常不安全，于是对我的服务器做了如下设置。

<!-- more -->
#### 改用ssh证书登录并更改登录端口

 ssh证书认证方式简单的解释是首先在客户端上创建一对公私钥 （公钥文件：`~/.ssh/id_rsa.pub`； 私钥文件：`~/.ssh/id_rsa`），然后把公钥放到服务器上（`~/.ssh/authorized_keys`）, 自己保留好私钥。当ssh登录时,ssh程序会发送私钥去和服务器上的公钥做匹配.如果匹配成功就可以登录了。以下操作仅针对Mac。

* **生成密钥**

  ```shell
  cd ~/.ssh
  ssh-keygen -t rsa
  ```

  生成后的密钥存放在`～/.ssh/`目录下生成了2个文件：`id_rsa`为私钥，`id_rsa.pub`为公钥。下面的操作均在该目录下进行。

* **发送公钥到服务器**

* ```shell
  ssh-copy-id -i id_rsa.pub root@host 
  ```

* **将私钥添加到由`ssh-agent` 维护的列表中**

  ```shell
  ssh-add -K id_rsa
  ```

* **修改config配置文件**

  ```shell
  vim config
  
	Host tencent									#ssh登录命令
  hostname host 								#服务器ip
	user root 										#root用户
  IdentityFile ~/.ssh/id_rsa 		#是mac上的私钥
  ```
  
* **测试是否设置成功**

  ```shell
  ssh tencent
  ```

  确实可以登录服务器，说明设置成功。

* **更改ssh登录登录端口**

  尽管本地电脑可以免密登录，但其他人仍然可以暴力尝试登录，把ssh登录端口号从默认22更改为其他。

  ```shell
  vim /etc/ssh/sshd_config
  Port 29826
  ```
  
  重启服务。
  
  ```shell
  service sshd restart 
  ```
  
  新的config文件设置如下所示。
  
  ```shell
  Host tencent									#ssh登录命令
  hostname host 								#服务器ip
  user root 										#root用户
  port 29826										#端口号
  IdentityFile ~/.ssh/id_rsa 		#是mac上的私钥
  ```
  
  这样一来，通过ssh证书指定端口登录，不存在服务器被暴力破解的问题了。

- **添加多个服务器**

  使用同一个公钥，将公钥发送到需要添加的服务器端，并在本地`config`文件添加和上面类似的描述就好了，如下所示。

  ```shell
  Host tencent                                            
  hostname hostname
  user root
  port 29826
  IdentityFile ~/.ssh/id_rsa
    
  Host newair
  hostname hostname
  user root
  port 28922
  IdentityFile ~/.ssh/id_rsa
  ```

参考链接：[@dreday](https://zhuanlan.zhihu.com/p/32279976)
