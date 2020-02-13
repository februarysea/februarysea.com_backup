---
title: 1185. Day of the Week
date: 2019-12-08 14:55:32
categories: LeetCode解题记录
tags:
- C
- LeetCode
- algorithm
---

随意刷到的一个比较后面的题，看起来有解法上的奇技淫巧就顺手做了。

#### 题目描述

给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。

输入为三个整数：day、month 和 year，分别表示日、月、年。

您返回的结果必须是这几个值中的一个 {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}。

示例 1：

```
输入：day = 31, month = 8, year = 2019
输出："Saturday"
```

示例 2：

```
输入：day = 18, month = 7, year = 1999
输出："Sunday"
```

示例 3：

```
输入：day = 15, month = 8, year = 1993
输出："Sunday"
```

#### 题解

自己要注意的是，刚开始写成了`case1-7`,后来改正了就OK。

```c
char * dayOfTheWeek(int day, int month, int year){
    char *weekday;
    if(month==1||month==2) {
        year--;
        month = month + 12;
    }
    int w= (day+2*month+3*(month+1)/5+year+year/4-year/100+year/400+1) % 7;
    switch (w) { 
        case 0:
            weekday = "Sunday";
            break;
        case 1:
            weekday = "Monday";
            break;
        case 2:
            weekday = "Tuesday";
            break;
        case 3:
            weekday = "Wednesday";
            break;
        case 4:
            weekday = "Thursday";
            break;
        case 5:
            weekday = "Friday";
            break;
        case 6:
            weekday = "Saturday";
            break;

    }
    return weekday;
}
```

![](https://raw.githubusercontent.com/februarysea/picbed/master/B33E53A01787B9F97F8EF82A604CAC44.png)

#### 笔记

* 基姆拉尔森计算公式（Kim larsen calculation formula）

  具体来说就是

  ```c
  W= (d+2*m+3*(m+1)/5+y+y/4-y/100+y/400+1)%7
  ```

  在公式中d表示日期中的日数，m表示月份数，y表示年数。

  注意：在公式中有个与其他公式不同的地方：

  把一月和二月看成是上一年的十三月和十四月，例：如果是2004-1-10则换算成：2003-13-10来代入公式计算。

* 字符数组和字符指针

  ```c
  char *str = "This is a string."; 
  ```

  是对字符指针进行初始化。此时，字符指针指向的是一个字符串常量的首地址，即指向字符串的首地址。 
  这里要注意字符指针与字符数组之间的区别。例如，有说明语句： 

  ```c
  char string[ ]="This is a string."; 
  ```

  此时，string是字符数组，它存放了一个字符串。 
  字符指针str与字符数组string的区别是：str是一个变量，可以改变str使它指向不同的字符串，但不能改变str所指的字符串常量。string是一个数组，可以改变数组中保存的内容。

* switch-case的具体实现

  ```c
  switch(expression) {
     case constant-expression  :
        statement(s);
        break; /* optional */
  
     case constant-expression  :
        statement(s);
        break; /* optional */
  
     /* you can have any number of case statements */
     default : /* Optional */
     statement(s);
  }
  ```

  * switch语句中使用的表达式必须具是`int`或`enum`类型
    switch可以任意个case语句(包括没有), 值和语句之间使用:分隔case后面的值必须是int常量值，或者返回结果为int类型的表达式。

  * 当switch后面的变量值和case后面的常量值匹配相等后,case后面的代码将会被执行，直到break语句被执行后跳出switch代码块

  * break不是必须的，如果没有break，则执行完当前case的代码块后会继续执行后面case代码块的内容，直到执行break才可以退出

  * switch有一个默认的情况，用default关键词表示，当switch后面的变量和所有case后面的常量都不匹配的情况下,默认执行default后面的语句

    