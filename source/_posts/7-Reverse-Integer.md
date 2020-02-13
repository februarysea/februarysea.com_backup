---
title: 7. Reverse Integer
date: 2019-12-08 20:43:02
categories: LeetCode解题记录
tags:
- C
- LeetCode
- algorithm
---

####题目描述

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:

```
输入: 123
输出: 321
```

 示例 2:

```
输入: -123
输出: -321
```

示例 3:

```
输入: 120
输出: 21
```

注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [${ -{2}^{31} }$,  ${ {2}^{31} }-1$]。请根据这个假设，如果反转后整数溢出那么就返回 0。

####题解

不考虑溢出的话很简单，考虑溢出的话，单独考虑`x=-2147483648`的情况。

但是我还是有一个问题没有解决...

当输入的数是反转后溢出的数`x = x/10;`这一行代码最终循环会的到一个负数x,最后只要判断如果`x<0`置0就完事了，这样就能判断反转后是否溢出，但是原理没搞懂。

```c
int reverse(int x){
    int minus = 0;
    int length =0;
    int a[32];
    if(x==0) {
        x = 0;
    }
    else if(x==-2147483648) {
        return 0;
    }
    else if(x<0) {
        x = abs(x);
        minus = 1;
    }
    length = log10(x)+1;
    for(int i=0;i<length;i++) {
        a[i] = x%10;
        x = x/10;
    }
    for(int i=0;i<length;i++) {
        x = x + pow(10,length-i-1)*a[i];
    }
    if(x<0) {
        x = 0;
    }
    else if(minus==1) {
        x = -x;
    }
    return x;
}
```

#### 其他解法

>```c++
>class Solution {
>public:
>    int reverse(int x) {
>        if(x/10 == 0) return x; //平凡情况：若x∈[-9,9]，则直接返回其本身
>        long y = 0; 
>        while(x) {
>            y *= 10;
>            if(y > INT_MAX || y < INT_MIN)
>                return 0; //溢出
>            y += x % 10;  //取出x的个位，存入y中对称的位置
>            x /= 10;      //去掉x的个位
>        }
>        return y;
>    }
>};
>```
>
>作者：initial_d-2
>链接：https://leetcode-cn.com/problems/reverse-integer/solution/0ms_ji-jian-_chao-yue-100_yi-dong-_7zheng-shu-fan-/
>来源：力扣（LeetCode）
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

看了大神分享的c++解法，自己改成了c的解法，具体思想就是在得到这个数的某位的值的同时把它赋给新值，取值反转一步实现。

```c
int reverse(int x){
    if(x/10 == 0) {
        return x;
    }
    long y = 0;
    while(x) {
        y *= 10;
        if(y>INT_MAX || y<INT_MIN) {
            return 0;
        }
        y += x%10;
        x /= 10;
    }
    return y;
}
```



#### 遇到的问题 

* `abs()`函数

  ```c
  Line 9: Char 11: runtime error: negation of -2147483648 cannot be represented in type 'int'; cast to an unsigned type to negate this value to itself (solution.c)
  ```

  > In 2's complement systems, the absolute value of the most-negative value is out of range, e.g. for 32-bit 2's complement type int, INT_MIN is -2147483648, but the would-be result 2147483648 is greater than INT_MAX, which is 2147483647.

  具体来说， `int`型的取值在[${ -{2}^{31} }$,  ${ {2}^{31} }-1$]，定义了`INT_MIN=-2147483648`，`INT_MAX=2147483647`，当输入`-2147483648`返回值就会溢出。贴一个[解答](https://stackoverflow.com/questions/11243014/why-the-absolute-value-of-the-max-negative-integer-2147483648-is-still-2147483)。

* 求整数位数的方法

  1. 循环/除10
  2. `length = log10(x)+1`
  3. 字符串输入，通过函数`strlen()`获取位数