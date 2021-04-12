---
title: Python面试题目总结
date: 2021-03-27 09:05:44
categories: 学习笔记
tags: 
- Python
---

根据[taizilongxu](https://github.com/taizilongxu)/[interview_python](https://github.com/taizilongxu/interview_python)整理，结合自身知识有所修改。

------

## 可变（mutable）对象和不可变（immutable）对象

在python中，strings, tuples, 和numbers是不可变的对象，而 list, dict, set 等则是可变的对象。

所以在参数传递过程中，可变对象传递的是一个值，在函数中这个值指向一个新的内存。

```python
a = 1
def fun(a):
    a = 2
fun(a)
print a  # 1
```

不可变对象传递的是对象地址，函数中对不可变对象进行增加、删除等操作就是对原不可变对象进行操作。

```python
a = []
def fun(a):
    a.append(1)
fun(a)
print a  # [1]
```

在python中，数字属于不可变类型，所以不存在自增的操作，i = i+1本质是i指向一个新的内存，存储的是i+1的值，原来的i值被舍弃的过程。 对于小整数[-5, 256]。考虑到小整数可能频繁使用，出于性能考虑，Python使用小整数对象缓冲池`small_ints`缓存了[-5, 256]的整数，该范围内的整数在Python系统中是共享的。小整数对象在Python启动过程中初始化，这些个小整数对象的`ob_refcnt`不会改变且永远>0,所以在vm运行过程中不会被销毁，所以起到了缓冲的作用。

在Python中，一切都是对象，对象比较可以用**`==`**或者**`is`**。

**`==`**比较的是两个对象的内容是否相等，默认会调用对象的 ***\*eq\**()** 方法。

**`is`**比较的是两个对象的 id 是否相等，也就是是否是同一个对象，是否指向同一个内存地址。

## Python方法

Python有3个方法,即静态方法(staticmethod),类方法(classmethod)和实例方法,如下:

```python
def foo(x):
    print "executing foo(%s)"%(x)

class A(object):
    def foo(self,x):
        print "executing foo(%s,%s)"%(self,x)

    @classmethoddef class_foo(cls,x):
        print "executing class_foo(%s,%s)"%(cls,x)

    @staticmethoddef static_foo(x):
        print "executing static_foo(%s)"%x

a=A()
```

这里先理解下函数参数里面的self和cls.这个self和cls是对类或者实例的绑定,对于一般的函数来说我们可以这么调用`foo(x)`,这个函数就是最常用的,它的工作跟任何东西(类,实例)无关.对于实例方法,我们知道在类里每次定义方法的时候都需要绑定这个实例,就是`foo(self, x)`,为什么要这么做呢?因为实例方法的调用离不开实例,我们需要把实例自己传给函数,调用的时候是这样的`a.foo(x)`(其实是`foo(a, x)`).类方法一样,只不过它传递的是类而不是实例,`A.class_foo(x)`.注意这里的self和cls可以替换别的参数,但是python的约定是这俩,还是不要改的好.

对于静态方法其实和普通的方法一样,不需要对谁进行绑定,唯一的区别是调用的时候需要使用`a.static_foo(x)`或者`A.static_foo(x)`来调用.

[三种方法对比](https://www.notion.so/995e12e5f0274271af5e102d6d3caf72)

## 访问权限与命名的关系

在Python中，属性和方法的访问权限只有两种，也就是公开的和私有的，如果希望属性是私有的，在给属性命名时可以用单个下划线作为开头。

(1)以单下划线开头，表示这是一个**保护成员**，只有类对象和子类对象自己能访问到这些变量。以单下划线开头的变量和函数被默认当作是内部函数，使用from module improt *时不会被获取，但是使用import module可以获取

(2)以单下划线结尾仅仅是为了区别该名称与关键词

(3)双下划线开头，表示为**私有成员**，只允许类本身访问，子类也不行。在文本上被替换为_class__method

双下划线开头，双下划线结尾。一种约定，Python内部的名字，用来区别其他用户自定义的命名,以防冲突。是一些 Python 的“魔术”对象，表示这是一个特殊成员，例如：定义类的时候，若是添加__init__方法，那么在创建类的实例的时候，实例会自动调用这个方法，一般用来对实例的属性进行初使化，Python不建议将自己命名的方法写为这种形式。

self在定义时需要定义，但是在调用时会自动传入。

self的名字并不是规定死的，但是最好还是按照约定是用self

self总是指调用时的类的实例。

## 生成器和迭代器

```python
>>> L = [x*x for x in range(10)]
>>> L
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
>>> g = (x*x for x in range(10))
>>> g
<generator object <genexpr> at 0x0000028F8B774200>
```

通过列表生成式，可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。而且，创建一个包含百万元素的列表，不仅是占用很大的内存空间，如：我们只需要访问前面的几个元素，后面大部分元素所占的空间都是浪费的。因此，没有必要创建完整的列表（节省大量内存空间）。在Python中，我们可以采用生成器：边循环，边计算的机制—>generator。

如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator：

```python
def fib(max):
    n, a, b = 0, 0, 1
		while n < max:
				yield b
			  a, b = b, a + b
		    n = n + 1
		return 'done'
```

而生成器不但可以作用于for循环，还可以被next()函数不断调用并返回下一个值，直到最后抛出StopIteration错误表示无法继续返回下一个值了。可以被next()函数调用并不断返回下一个值的对象称为迭代器：`Iterator`。

这是因为Python的`Iterator`对象表示的是一个数据流，Iterator对象可以被`next()`函数调用并不断返回下一个数据，直到没有数据时抛出`StopIteration`错误。可以把这个数据流看做是一个有序序列，但我们却不能提前知道序列的长度，只能不断通过`next()`函数实现按需计算下一个数据，所以`Iterator`的计算是惰性的，只有在需要返回下一个数据时它才会计算。

`Iterator`甚至可以表示一个无限大的数据流，例如全体自然数。而使用list是永远不可能存储全体自然数的。

凡是可作用于`for`循环的对象都是`Iterable`类型；

凡是可作用于`next()`函数的对象都是`Iterator`类型，它们表示一个惰性计算的序列；

集合数据类型如`list`、`dict`、`str`等是`Iterable`但不是`Iterator`，不过可以通过`iter()`函数获得一个`Iterator`对象。

## *args and **kwargs

`*args`和`**kwargs`可以同时在函数的定义中,但是`*args`必须在`**kwargs`前面。

用`*args`和`**kwargs`只是为了方便并没有强制使用它们。

当不确定函数里将要传递多少参数时你可以用`*args`，它可以传递任意数量的参数，以元祖的形式传递。

`**kwargs`允许使用没有事先定义的参数名，以字典的的形式传递:

```python
>>> def table_things(**kwargs):
...     for name, value in kwargs.items():
...         print '{0} = {1}'.format(name, value)
...
>>> table_things(apple = 'fruit', cabbage = 'vegetable')
cabbage = vegetable
apple = fruit
```

## 装饰器

本质上，装饰器就是一个返回函数的高阶函数。

```python
import time
# 定义装饰器
def test(func):
    def wrapper(*arg, **kwargs):
        print("starttime:")
        func(*arg, **kwargs)
        print("stoptime:")
    return wrapper

# 使用装饰器
@test    
def add(a, b):
    print("a+b:",a+b)
    
@test
def sub(a, b):    
    print("a-b:",a-b)

add(1,3)
```

## Python中重载

函数重载主要是为了解决两个问题。

1. 可变参数类型。
2. 可变参数个数。

另外，一个基本的设计原则是，仅仅当两个函数除了参数类型和参数个数不同以外，其功能是完全相同的，此时才使用函数重载，如果两个函数的功能其实不同，那么不应当使用重载，而应当使用一个名字不同的函数。

好吧，那么对于情况 1 ，函数功能相同，但是参数类型不同，python 如何处理？答案是根本不需要处理，因为 python 可以接受任何类型的参数，如果函数的功能相同，那么不同的参数类型在 python 中很可能是相同的代码，没有必要做成两个不同函数。

那么对于情况 2 ，函数功能相同，但参数个数不同，python 如何处理？大家知道，答案就是缺省参数。对那些缺少的参数设定为缺省参数即可解决问题。因为你假设函数功能相同，那么那些缺少的参数终归是需要用的。

好了，鉴于情况 1 跟 情况 2 都有了解决方案，python 自然就不需要函数重载了。

## __new__和__init__的区别

`__init__`方法做的事情是在对象创建好之后初始化变量。真正创建实例的是`__new__`方法。

1. `__new__`是一个静态方法,而`__init__`是一个实例方法.
2. `__new__`方法会返回一个创建的实例,而`__init__`什么都不返回.
3. 只有在`__new__`返回一个cls的实例时后面的`__init__`才能被调用.
4. 当创建一个新实例时调用`__new__`,初始化一个实例时用`__init__`.

## 单例模式

单例模式是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例类的特殊类。通过单例模式可以保证系统中一个类只有一个实例而且该实例易于外界访问，从而方便对实例个数的控制并节约系统资源。如果希望在系统中某个类的对象只能存在一个，单例模式是最好的解决方案。

在Python中，如果已经导入过的文件再次被重新导入时候，python不会再重新解释一遍，而是选择从内存中直接将原来导入的值拿来用，这就是Python模块导入的特性。

1. 文件导入

```python
s1.py

class Foo(object):
    def test(self):
        print("123")

v = Foo()
#v是Foo的实例

s2.py
from s1 import v as v1
print(v1,id(v1))  #<s1.Foo object at 0x0000000002221710> 35788560

from s1 import v as v2
print(v1,id(v2))   #<s1.Foo object at 0x0000000002221710> 35788560

## 两个的内存地址是一样的
## 文件加载的时候，第一次导入后，再次导入时不会再重新加载。
```

1. 基于__new__实现

```python
class Singleton:
    def __new__(cls, *args, **kw):
        if not hasattr(cls, '_instance'):
            cls._instance = object.__new__(cls, *args, **kw)
        return cls._instance

one = Singleton()
two = Singleton()

two.a = 3
print(one.a)
## 3
## one和two完全相同,可以用id(), **, is检测
print(id(one))
## 29097904
print(id(two))
## 29097904
print(one ** two)
## True
print(one is two)
```

## GIL全局解释器锁

线程全局锁(Global Interpreter Lock),即Python为了保证线程安全而采取的独立线程运行的限制,说白了就是一个核只能在同一时间运行一个线程.对于io密集型任务，python的多线程起到作用，但对于cpu密集型任务，python的多线程几乎占不到任何优势，还有可能因为争夺资源而变慢。一个线程有两种情况下会释放全局解释器锁，一种情况是在该线程进入IO操作之前，会主动释放GIL，另一种情况是解释器不间断运行了1000字节码（Py2）或运行15毫秒（Py3）后，该线程也会放弃GIL。

在Python多线程下，每个线程的执行方式：

1.获取GIL

2.执行代码直到sleep或者是python虚拟机将其挂起。

3.释放GIL

## Python里的拷贝

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2667dcdc-b7e8-4c83-b341-bd7311a11b7b/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2667dcdc-b7e8-4c83-b341-bd7311a11b7b/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/26799a95-9f32-449e-b960-b8264a18f4de/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/26799a95-9f32-449e-b960-b8264a18f4de/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee8e66e7-451a-4724-91cd-4364b415819c/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ee8e66e7-451a-4724-91cd-4364b415819c/Untitled.png)

```python
import copy
a = [1, 2, 3, 4, ['a', 'b']]  #原始对象

b = a  #赋值，传对象的引用
c = copy.copy(a)  #对象拷贝，浅拷贝
d = copy.deepcopy(a)  #对象拷贝，深拷贝

a.append(5)  #修改对象a
a[4].append('c')  #修改对象a中的['a', 'b']数组对象

print 'a = ', a
print 'b = ', b
print 'c = ', c
print 'd = ', d

输出结果：
a =  [1, 2, 3, 4, ['a', 'b', 'c'], 5]
b =  [1, 2, 3, 4, ['a', 'b', 'c'], 5]
c =  [1, 2, 3, 4, ['a', 'b', 'c']]
d =  [1, 2, 3, 4, ['a', 'b']]
```

## Python垃圾回收机制

Python GC主要使用引用计数（reference counting）来跟踪和回收垃圾。在引用计数的基础上，通过“标记-清除”（mark and sweep）解决容器对象可能产生的循环引用问题，通过“分代回收”（generation collection）以空间换时间的方法提高垃圾回收效率。

**1 引用计数**

PyObject是每个对象必有的内容，其中`ob_refcnt`就是做为引用计数。当一个对象有新的引用时，它的`ob_refcnt`就会增加，当引用它的对象被删除，它的`ob_refcnt`就会减少.引用计数为0时，该对象生命就结束了。

优点:

1. 简单
2. 实时性

缺点:

1. 维护引用计数消耗资源
2. 循环引用

**2 标记-清除机制**

基本思路是先按需分配，等到没有空闲内存的时候从寄存器和程序栈上的引用出发，遍历以对象为节点、以引用为边构成的图，把所有可以访问到的对象打上标记，然后清扫一遍内存空间，把所有没标记的对象释放。

**3 分代技术**

分代回收的整体思想是：将系统中的所有内存块根据其存活时间划分为不同的集合，每个集合就成为一个“代”，垃圾收集频率随着“代”的存活时间的增大而减小，存活时间通常利用经过几次垃圾回收来度量。

Python默认定义了三代对象集合，索引数越大，对象存活时间越长。

举例： 当某些内存块M经过了3次垃圾收集的清洗之后还存活时，我们就将内存块M划到一个集合A中去，而新分配的内存都划分到集合B中去。当垃圾收集开始工作时，大多数情况都只对集合B进行垃圾回收，而对集合A进行垃圾回收要隔相当长一段时间后才进行，这就使得垃圾收集机制需要处理的内存少了，效率自然就提高了。在这个过程中，集合B中的某些内存块由于存活时间长而会被转移到集合A中，当然，集合A中实际上也存在一些垃圾，这些垃圾的回收会因为这种分代的机制而被延迟。

## 对面向对象的理解

面向对象是现实世界模型的自然延伸，这是一种"万物皆对象"的编程思想。在现实生活中的任何物体都可以归为一类事物，而一个个体都是一类事物的实例。

面向对象有三大特性，封装，继承，多态。

1、“封装”是面向对象的基础，它让我们能够把现实环境的复杂内容进行归类，让编程无论在理解度上还是在语法上进行更好的表达，使其属性私有化，行为公开化，提高数据的隐秘性的同时，使得代码模块化。这样使得代码的复用性更高。

2、“继承”表达的是“重复”，是复用性的体现，能够让我们通过找到类型的共性进行更进一步的提取和划分；每一个子类是一个特殊的父类-有父类的行为和属性，也有自己的特有的行为和属性。这样做扩展了已存在的代码块，进一步提高了代码的复用性。

3、“多态”则是多样性、可扩展性的体现。面对丰富的和可能不断变化的问题域，让我们的程序能够有更大的容纳性去模拟和适应这些变化。简单说多态就是相同的对象调用同样的方法但做了不同的事情。主要的目的是实现接口的可重用性。

多态的实现主要有两种方式：（1）方法重写，实现运行时的多态。子类继承父类重写父类的方法，父类引用指向子类对象；（2）方法重载，实现编译时的多态。主要通过参数的个数和类型进行方法重载。

## lambda表达式

简单来说，lambda表达式通常是当你需要使用一个函数，但是又不想费脑袋去命名一个函数的时候使用，也就是通常所说的匿名函数。

lambda表达式一般的形式是：关键词lambda后面紧接一个或多个参数，紧接一个冒号“：”，紧接一个表达式。lambda表达式是一个表达式不是一个语句。

```python
f = lambda a,b: a*b
```

## 正则表达式 re库

```python
"^.*$"        # ^代表开头，$代表结尾
re.math()     # 从开头开始匹配，不匹配则返回none
re.search()   # 寻找全局，直到找到pattern
re.sub()      # 替换
re.findall()  # 用列表返回所有匹配的对象
re.finditer() # 用迭代器返回所有匹配的对象 
re.split()    # 分割后返回列表
```