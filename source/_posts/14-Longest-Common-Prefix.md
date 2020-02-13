---
title: 14. Longest Common Prefix
date: 2020-02-07 14:16:09
categories: LeetCode解题记录
tags:
- Python
- LeetCode
- algorithm
---

#### 题目描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

```
输入: ["flower","flow","flight"]
输出: "fl"
```

示例 2:

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

说明:

```
所有输入只包含小写字母 a-z 。
```

#### 题解

**水平扫描法**

```python
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        result = ""
        for i in range(0, len(strs)):
            if i==0:
                result = strs[0]
                continue
            if len(result)>len(strs[i]):
                length = len(strs[i])
            else:
                length = len(result)
            if length==0:
                return ""
            temp = ""
            for k in range(0, length):
                if result[k]==strs[i][k]:
                    temp = temp + strs[i][k]
                    if k==length-1:
                        result = temp
                else:
                    result = temp
                    break
        return result
```

#### 笔记

* `len()`函数的底层实现：`len()`函数对于内置类型，会去C底层实现的结构体里取一个字段值，这个字段值记录了长度。