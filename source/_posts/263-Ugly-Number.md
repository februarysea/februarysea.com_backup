---
title: 263. Ugly Number
date: 2019-12-08 09:27:06
categories: LeetCode解题记录
tags:
- C
- LeetCode
- algorithm
---

#### 题目描述

编写一个程序判断给定的数是否为丑数。

丑数就是只包含质因数 2, 3, 5 的正整数。

示例 1:

```
输入: 6
输出: true
解释: 6 = 2 × 3
```

示例 2:

```
输入: 8
输出: true
解释: 8 = 2 × 2 × 2
```

示例 3:

```
输入: 14
输出: false 
解释: 14 不是丑数，因为它包含了另外一个质因数 7。
```

说明：

```
1 是丑数。
输入不会超过 32 位有符号整数的范围: [−231,  231 − 1]。
```



#### 题解

```C
_Bool isUgly(int num){
    if(num==1) {
        return 1;
    }
    else if(num<=0) {
        return 0;
    }
    if(num%2==0) {
        isUgly(num/2);
        if (isUgly(num/2)) {
            return 1;
        }
    }
    else if(num%3==0) {
        isUgly(num/3);
        if (isUgly(num/3)) {
            return 1;
        }
    }
    else if(num%5==0) {
        if (isUgly(num/5)) {
            return 1;
        }
    }
    return 0;
}
```

这样是可以通过的，但是看了其他人的解题思路：

```go
func isUgly(num int) bool {
    if num == 0 {
        return false
    }
    for num!=1 {
        if num%2==0 {
            num /= 2
        } else if num%3==0 {
            num /=3 
        } else if num%5==0 {
            num /=5
        } else {
            return false
        }   
    }
    return true
}

作者：elliotxx
链接：https://leetcode-cn.com/problems/ugly-number/solution/0msgo-shi-xian-by-elliotxx-13/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

试着改进一下：

```C
_Bool isUgly(int num){
    if(num==0) {
        return 0;
    }
    while(num!=1) {
        if(num%2==0) {
            num = num/2;
        }
        else if(num%3==0) {
            num = num/3;
        }
        else if(num%5==0) {
            num = num/5;
        }
        else {
            return 0;
        }
    }
    return 1;
}
```

具体来说，就是将递归函数改为循环，最后执行时间0ms。
