---
title: 70. Climbing Stairs
date: 2020-02-06 15:09:45
categories: LeetCode解题记录
tags:
- Python
- LeetCode
- algorithm
---

####题目描述

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1.  1 阶 + 1 阶
2.  2 阶
```

示例 2：

```
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。

1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

#### 题解

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n==1:
            return 1
        dp = []
        # dp[i] = dp[i-1] + dp[i-2]
        dp.append(0)
        dp.append(1)
        dp.append(2)
        for i in range(3, n+1):
            dp.append(dp[i-1] + dp[i-2])
        return dp[n]
```

#### 笔记

本题用到了动态规划算法

>**动态规划**（英语：Dynamic programming，简称DP）是一种在[数学](https://zh.wikipedia.org/wiki/数学)、[管理科学](https://zh.wikipedia.org/wiki/管理科学)、[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)、[经济学](https://zh.wikipedia.org/wiki/经济学)和[生物信息学](https://zh.wikipedia.org/wiki/生物信息学)中使用的，通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。
>
>动态规划常常适用于有重叠子问题和[最优子结构](https://zh.wikipedia.org/w/index.php?title=最优子结构&action=edit&redlink=1)（英语：[Optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure)）性质的问题，动态规划方法所耗时间往往远少于朴素解法。
>
>动态规划背后的基本思想非常简单。大致上，若要解一个给定问题，我们需要解其不同部分（即子问题），再根据子问题的解以得出原问题的解。
>
>通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，从而减少计算量：一旦某个给定子问题的解已经算出，则将其[记忆化](https://zh.wikipedia.org/wiki/记忆化)存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈[指数增长](https://zh.wikipedia.org/wiki/指數增長)时特别有用。

