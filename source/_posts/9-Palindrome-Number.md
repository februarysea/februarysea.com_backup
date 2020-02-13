---
title: 9. Palindrome Number
date: 2019-12-09 11:35:07
categories: LeetCode解题记录
tags:
- C
- LeetCode
- algorithm
---

#### 题目描述

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

```
输入: 121
输出: true
```

示例 2:

```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

示例 3:

```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```

#### 题解

暴力解法没什么好说的...

```c
bool isPalindrome(int x){
    int a[10];
    if(x<0) {
        return 0;
    }
    int length = log10(x) + 1;
    for(int i=0;i<length;i++) {
        a[i] = x%10;
        x = x/10;
    }
    for(int i=0;i<length;i++) {
        if(a[i]==a[length-i-1]) {
            continue;
        }
        else{
            return 0;
        }
    }
    return 1;
}
```

看了一下其他人的解法，我的步骤太过繁琐了，更简单的做法是，把一个数分成前后两部分，反转一部分，然后比较反转后的部分和另一部分是否相同，如果相同那么就是回文数。类似于7. Reverse Integer。