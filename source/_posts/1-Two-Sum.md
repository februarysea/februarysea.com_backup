---
title: 1. Two Sum
date: 2019-12-07 08:55:48
categories: LeetCode解题记录
tags:
- Python
- LeetCode
- algorithm
---

#### 题目描述

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

```
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

#### 题解

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashmap={}
        # enumerate()返回list顺序和所对应的值的key-value的list
        for index,num in enumerate(nums):
            hashmap[num] = index
        for i,num in enumerate(nums):
            j = hashmap.get(target-num)
            if j is not None and i!=j:
                return [i,j]
```

####  笔记

* 用暴力法需要遍历每一个元素两遍，时间复杂度$O(n^2)$
* 哈希表将查找时间缩短到 $O(1)$，所以时间复杂度为$O(n)$
* `enumerate()`函数返回了数据和数据下标的list。