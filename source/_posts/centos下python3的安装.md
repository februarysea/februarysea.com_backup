---
title: centos下python3的安装
date: 2019-06-13 19:57:58
categories: 学习笔记
tags: 
- linux
- python
---

服务器中新安装的系统只有`python2`没有`python3`，只好自己装`python3`，下面是过程。

```shell
cd /usr/bin/
ll python*
```

显示当前`python`的软链接，需要做的是把`python->python2`改为`python->python3`，两版本就可以共存。

```
lrwxrwxrwx. 1 root root    9 3月   19 2018 python -> python2
lrwxrwxrwx. 1 root root    9 3月   19 2018 python2 -> python2.7
-rwxr-xr-x. 1 root root 7136 8月   4 2016 python2.7
```

安装编译`python3`所用到的相关依赖

```shell
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
```

添加`epel`扩展源且安装`pip`

````shell
yum -y install epel-release
yum install python-pip
````

用`pip`安装`wget`

```shell
pip install wget
```

用`wget`下载`python3`压缩包

```shell
wget https://www.python.org/ftp/python/3.6.4/Python-3.6.4.tar.xz
```

解压编译python3压缩包

```shell
#解压
xz -d Python-3.6.4.tar.xz
tar -xf Python-3.6.4.tar
cd 	Python-3.6.4

#编译
./configure prefix=/usr/local/python3
make && make install
```

如果最后没提示出错，就代表正确安装了，在`/usr/local/`目录下就会有`python3`目录。

把`python3`的`bin`添加到环境变量中。

```shell
export PATH=$PATH:/usr/local/python3/bin
```

删除`python->python2`的软链接，添加`python3`相关的软链接。

```shell
#删除python->python2的软链接
rm /usr/bin/pip /usr/bin/pip.bak

#添加python->python3的软链接
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip 

#添加pip->pip3的软链接
ln -s /usr/local/python3/bin/python3.6 /usr/bin/python
```

`python3`现在已经可以在Linux服务器下正常使用了。
