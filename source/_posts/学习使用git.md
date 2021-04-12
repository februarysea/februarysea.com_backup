---
title: 学习使用git
date: 2019-07-07 21:12:40
categories: 学习笔记
tags: 
- Linux
---

一直在使用[github](https://github.com/)，对Git的操作多多少少也知道一些，但一直没有系统的学习过，脑海中是很零散的知识，所以记录一下一些Git的基本概念和操作。

### Git简介

Git 把数据看作是对小型文件系统的一组快照。 每次提交更新，或在 Git 中保存项目状态时，它主要对当时的全部文件制作一个快照并保存这个快照的索引。 为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 **快照流**。

![](https://raw.githubusercontent.com/februarysea/picbed/master/20190707212257.png)

 Git 有三种状态：已提交（committed）、已修改（modified）和已暂存（staged）。 已提交表示数据已经安全的保存在本地数据库中。 已修改表示修改了文件，但还没保存到数据库中。 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。由此引入 Git 项目的三个工作区域的概念：Git 仓库、工作目录以及暂存区域。

![](https://raw.githubusercontent.com/februarysea/picbed/master/20190707212252.png)

Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。 这是 Git 中最重要的部分，从其它计算机克隆仓库时，拷贝的就是这里的数据。

工作目录是对项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。

暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。 有时候也被称作`‘索引’'，不过一般说法还是叫暂存区域。

基本的 Git 工作流程如下：

1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。

### Git的基本操作

##### 创建Git仓库

```shell
$ git init
```

该命令将创建一个名为 `.git` 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是 Git 仓库的骨干。 但是，在这个时候，我们仅仅是做了一个初始化的操作，你的项目里的文件还没有被跟踪。

##### 添加文件到版本库

```shell
$ git add file
```

这样一来，`git add`把文件添加进去，实际上就是把文件修改添加到暂存区，我们希望提交不同的版本，还需要`commit`操作：

```shell
$ git commit -m "commit description"
```

后面的参数是`commit`的改动说明，为了日后方便查看。创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

查看提交记录：

```shell
$ git log
```

显示出来是类似这样的形式：

```shell
$ git log
commit e475afc93c209a690c39c13a46716e8fa000c366 (HEAD -> master)
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 21:03:36 2018 +0800

    add distributed

commit eaadf4e385e865d25c48e7ca9c8395c3f7dfaef0
Author: Michael Liao <askxuefeng@gmail.com>
Date:   Fri May 18 20:59:18 2018 +0800

    wrote a readme file

```

在Git中`HEAD`表示当前版本，`commit`后面的一长串字符串是`commit id`是用` SHA-1`计算出的校验和，用十六进制表示通俗来说就是版本号。

```shell
$ git log -p -2
```

`-p`用来显示每次提交的内容差异。 加上 `-2` 来仅显示最近两次提交，该选项除了显示基本信息之外，还附带了每次 commit 的变化。 当进行代码审查，或者快速浏览某个搭档提交的 commit 所带来的变化的时候，这个参数就非常有用了。

```shell
$ git log --stat
```

`--stat` 选项在每次提交的下面列出所有被修改过的文件、有多少文件被修改了以及被修改过的文件的哪些行被移除或是添加了。 在每次提交的最后还有一个总结。

```shell
$ git log --pretty=oneline
```

另外一个常用的选项是 `--pretty`。 这个选项可以指定使用不同于默认格式的方式展示提交历史。 这个选项有一些内建的子选项供你使用。 比如用 `oneline` 将每个提交放在一行显示，查看的提交数很大时非常有用。 另外还有 `short`，`full` 和 `fuller` 可以用。

值得一提的是 format，可以定制要显示的记录格式。 这样的输出对后期提取分析格外有用 — 因为你知道输出的格式不会随着 Git 的更新而发生改变：

```shell
$ git log --pretty=format:"%h - %an, %ar : %s"
ca82a6d - Scott Chacon, 6 years ago : changed the version number
085bb3b - Scott Chacon, 6 years ago : removed unnecessary test
a11bef0 - Scott Chacon, 6 years ago : first commit
```

##### 回溯上个版本

```shell
$ git reset --hard HEAD^
```

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的`HEAD`指针，当你回退版本的时候，Git仅仅是把HEAD从指向`append GPL`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   └──> ○ append GPL
        │
        ○ add distributed
        │
        ○ wrote a readme file
```

改为指向`add distributed`：

```ascii
┌────┐
│HEAD│
└────┘
   │
   │    ○ append GPL
   │    │
   └──> ○ add distributed
        │
        ○ wrote a readme file
```

然后顺便把工作区的文件更新了。所以你让`HEAD`指向哪个版本号，你就把当前版本定位在哪。如果后悔回溯操作的话，使用下面这个命令，查找之前版本的`commit id`：

```shell
$ git reflog
e475afc HEAD@{1}: reset: moving to HEAD^
1094adb (HEAD -> master) HEAD@{2}: commit: append GPL
e475afc HEAD@{3}: commit: add distributed
eaadf4e HEAD@{4}: commit (initial): wrote a readme file
```

这个命令记录了每一次Git操作，知道了每一次操作的`commit id`后使用:

```shell
$ git reset --hard 1094a
```

就能回到那个版本了。注意：版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。

##### 管理修改

查看两次`commit`的差别： 

```shell
$ git status
```

查看工作区和版本库里面最新版本的区别：

```shell
$ git diff HEAD -- filename
```

##### 撤销修改

```shell
$ git checkout -- filename
```

命令`git checkout -- filename`意思就是，把文件在工作区的修改全部撤销，这里有两种情况：

一种是文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是文件已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

用命令`git reset HEAD <file>`可以把暂存区的修改撤销掉（unstage），重新放回工作区：

```shell
$ git reset HEAD fliename
```

##### 删除文件

在Git下删除文件使用：

 ```shell
$ git rm file
 ```

##### 添加远程仓库

1. 创建SSH Key

   ```shell
   $ ssh-keygen -t rsa -C "youremail@example.com"
   ```

   在`~/.ssh`目录下可以看到有`id_rsa.pub`、 `id_rsa`分别是公钥和私钥。

2. 在GitHub上添加SSH Key

   打开`id_rsa.pub`复制里面的内容，添加到GitHub上。

3. 把项目添加到远程库

   在GitHub上创建一个新的`repository`。不要创建`README.md`按照GitHub的提示操作即可。

##### 克隆远程仓库

```shell
$ git clone git://github.com/februarysea/repository.git
$ git clone http://github.com/februarysea/repository.git
```

Git支持多种协议，默认的`git://`使用ssh，但也可以使用`https`等其他协议。使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用`ssh`协议而只能用`https`。



------

文章参考了[@廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)的教程以及[git官方网站](https://git-scm.com/)。
