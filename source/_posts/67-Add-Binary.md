---
title: 67. Add Binary
date: 2020-02-03 13:08:31
categories: LeetCode解题记录
tags:
- Python
- LeetCode
- algorithm
---

#### 题目描述

给定两个二进制字符串，返回他们的和（用二进制表示）。

输入为非空字符串且只包含数字 1 和 0。

示例 1:

```
输入: a = "11", b = "1"
输出: "100"
```

示例 2:

```
输入: a = "1010", b = "1011"
输出: "10101"
```

#### 题解

```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        if len(a)>len(b):
            b = '0' * (len(a)-len(b)) + b
            length = len(a)
        else:
            a = '0' * (len(b)-len(a)) + a
            length = len(b)
        a = list(a)
        b = list(b)
        flag = 0
        for i in range(length-1, -1, -1):
            if flag==1:
                flag = 0
                a[i] = int(a[i]) + 1
            a[i] = int(a[i]) + int(b[i])
            if a[i]>=2:
                a[i] = a[i] - 2
                flag = 1
        if flag==1:
            a.insert(0, 1)
        result = ""
        for num in a:
            result = result + str(num)
        return result
            
```

#### 笔记

`TypeError: 'str' object does not support item assignment`

原因是，在python中，**字符串是不可变对象**，不能通过下标的方式直接赋值修改。

* **不可变类型**（数字，字符串，元组，不可变集合）：不支持原处修改

* **可变类型**（列表，字典，可变集合）：可以通过操作原处修改，而不用创建新的对象

一般来说，**不可变类型具有某种完整性，保证这个对象不会被程序的其他部分改变**。

值得一提的是，对于小整数[-5, 256]。考虑到小整数可能频繁使用，出于性能考虑，Python使用小整数对象缓冲池`small_ints`缓存了[-5，257）之间的整数，该范围内的整数在Python系统中是共享的。小整数对象在py启动过程中初始化，这些个小整数对象的ob_refcnt不会改变且永远>0,所以在vm运行过程中不会被销毁，所以起到了缓冲的作用。

* 对于超出了[-5, 257)之间的其他整数，Python同样提供了专门的缓冲池（通用整数对象的缓冲池），供这些所谓的大整数使用，避免每次使用的时候都要不断的malloc分配内存带来的效率损耗。通过free-list，管理空闲空间。

* Python中的int对象就是c语言中long类型数值的扩展。

* 整数对象回收时，内存并不会归还给系统，而是将其对象的ob_type指向free_list，供新创建的对象使用。

![](https://images2018.cnblogs.com/blog/1227229/201803/1227229-20180309194835978-302319830.png)

所有的Python对象都拥有三个特性：身份，类型和值

- 身份： 每一个对象都有一个唯一的身份标识自己。任何对象的身份可以使用内建函数id()来得到。这个值可以被认为是该对象的内存地址
- 类型： 对象的类型决定了对象可以保存什么类型的值，可以进行什么样的操作，以及遵循什么样的规则。你可以内建type()查看对象的类型
- 值：对象表示的数据项