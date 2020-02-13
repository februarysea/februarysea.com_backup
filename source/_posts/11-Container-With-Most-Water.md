---
title: 11. Container With Most Water
date: 2020-02-07 14:56:12
categories: LeetCode解题记录
tags:
- Python
- LeetCode
- algorithm
---

#### 题目描述

给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

**示例:**

```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

#### 题解

**暴力法**（超出时间限制）：

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        res = 0
        for i in range(0, len(height)):
            for k in range(i+1,len(height)):
                temp = 0
                if height[k]>height[i]:
                    temp = height[i]
                else:
                    temp = height[k]
                if (k-i)*temp > res:
                    res = (k-i)*temp
        return res
```

**双指针法**：

>这种方法背后的思路在于，两线段之间形成的区域总是会受到其中较短那条长度的限制。此外，两线段距离越远，得到的面积就越大。
>
>我们在由线段长度构成的数组中使用两个指针，一个放在开始，一个置于末尾。 此外，我们会使用变量 maxareamaxarea 来持续存储到目前为止所获得的最大面积。 在每一步中，我们会找出指针所指向的两条线段形成的区域，更新 maxareamaxarea，并将指向较短线段的指针向较长线段那端移动一步。
>
>作者：LeetCode
>链接：https://leetcode-cn.com/problems/container-with-most-water/solution/sheng-zui-duo-shui-de-rong-qi-by-leetcode/
>来源：力扣（LeetCode）
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        res = 0
        i = 0
        k = len(height)-1
        while i!=k:
            if height[i]>height[k]:
                if res<height[k]*(k-i):
                    res = height[k]*(k-i)
                k -= 1
            else:
                if res<height[i]*(k-i):
                    res = height[i]*(k-i)
                i += 1
        return res
```

#### 笔记

* 为什么`python`没有`i++`这样的表达：

  在python中，**整数是不可变对象**，一旦一个整数对象创建，其值就不能再被改变。所以，就无法实现 自增、自减的操作了。

  