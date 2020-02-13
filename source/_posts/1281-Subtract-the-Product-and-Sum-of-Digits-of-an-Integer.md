---
title: 1281. Subtract the Product and Sum of Digits of an Integer
date: 2019-12-09 11:54:00
categories: LeetCode解题记录
tags:
- C
- LeetCode
- algorithm
---

#### 题目描述

给你一个整数 n，请你帮忙计算并返回该整数「各位数字之积」与「各位数字之和」的差。

示例 1：

```
输入：n = 234
输出：15 
解释：
各位数之积 = 2 * 3 * 4 = 24 
各位数之和 = 2 + 3 + 4 = 9 
结果 = 24 - 9 = 15
```

示例 2：

```
输入：n = 4421
输出：21
解释： 
各位数之积 = 4 * 4 * 2 * 1 = 32 
各位数之和 = 4 + 4 + 2 + 1 = 11 
结果 = 32 - 11 = 21
```


提示：

```
1 <= n <= 10^5
```

#### 题解

```c
int subtractProductAndSum(int n){
    int length=1;
    int muliti = 1;
    int add = 0;
    int temp;
    while(n/10>0) {
        temp = n % 10;
        muliti = muliti * temp;
        add = add + temp;
        n = n / 10;
    }
  	// 计算剩下的一个个位数
    muliti = muliti * n;
    add = add + n;
    return muliti-add;
}
```

