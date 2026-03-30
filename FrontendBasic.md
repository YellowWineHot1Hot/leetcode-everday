## 较鸡肋八股

https://blog.csdn.net/qq_41273887/article/details/129668093?spm=1011.2415.3001.5331
✅

## git、linux、sql

https://blog.csdn.net/qq_41273887/article/details/130054901?spm=1011.2415.3001.5331
✅

## webpack

https://blog.csdn.net/qq_41273887/article/details/130026966?spm=1011.2415.3001.5331
✅

## 网络

https://blog.csdn.net/qq_41273887/article/details/129804825?spm=1011.2415.3001.5331
✅

## 八股优化

1、https://blog.csdn.net/qq_41273887/article/details/129837105?spm=1011.2415.3001.5331
✅ 练习题-节流防抖

## 浏览器机制

1、https://blog.csdn.net/qq_41273887/article/details/129805166?spm=1011.2415.3001.5331
✅

## css、事件

1、https://blog.csdn.net/qq_41273887/article/details/131997814?spm=1011.2415.3001.5331
✅
2、https://blog.csdn.net/qq_41273887/article/details/132515968?spm=1011.2415.3001.5331
✅
3、https://blog.csdn.net/qq_41273887/article/details/129671669?spm=1011.2415.3001.5331
✅
4、事件代理：https://blog.csdn.net/qq_41273887/article/details/129642696?spm=1011.2415.3001.5331
✅ 手写 flex 布局、布局练习题、移动端响应式布局

## react

1、https://blog.csdn.net/qq_41273887/article/details/130157763?spm=1011.2415.3001.5331
✅
2、https://blog.csdn.net/qq_41273887/article/details/130223434?spm=1011.2415.3001.5331
✅
3、https://blog.csdn.net/qq_41273887/article/details/130273899?spm=1011.2415.3001.5331
4、https://blog.csdn.net/qq_41273887/article/details/130514697?spm=1011.2415.3001.5331
✅

## js

1、继承、安全、设计模式：https://blog.csdn.net/qq_41273887/article/details/129825687?spm=1011.2415.3001.5331
🍵 安全、设计模式
2、js基础简单：https://blog.csdn.net/qq_41273887/article/details/132116438?spm=1011.2415.3001.5331
✅ 练习题-this
3、js基础困难：https://blog.csdn.net/qq_41273887/article/details/129683898?spm=1011.2415.3001.5331
🍵
4、es6：https://blog.csdn.net/qq_41273887/article/details/129774506?spm=1011.2415.3001.5331
✅
5、异步：https://blog.csdn.net/qq_41273887/article/details/129812470?spm=1011.2415.3001.5331
✅ 练习题-异步
6、数据存储与垃圾回收：https://blog.csdn.net/qq_41273887/article/details/129760966?spm=1011.2415.3001.5331
✅ 手写递归深拷贝、instanceof

## js编程

1、js数据结构：https://blog.csdn.net/qq_41273887/article/details/129757017?spm=1011.2415.3001.5331
2、基础算法：https://www.acwing.com/blog/content/277/
3、数据结构：https://www.acwing.com/blog/content/404/
4、算法3、算法4：https://www.acwing.com/blog/content/405/、https://www.acwing.com/blog/content/406/

✅

### 防抖、节流

```javascript
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
```

### 邻接矩阵

g[a][b]

### 邻接表

```C++
// 对于每个点k，开一个单链表，存储k所有可以走到的点。h[k]存储这个单链表的头结点
int h[N], e[N], ne[N], idx;

// 添加一条边a->b
void add(int a, int b)
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++ ;
}

// 初始化
idx = 0;
memset(h, -1, sizeof h);
```

### 深度优先搜索

```C++
int dfs(int u)
{
    st[u] = true; // st[u] 表示点u已经被遍历过

    for (int i = h[u]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (!st[j]) dfs(j);
    }
}
```

### 宽度优先搜索

```C++
queue<int> q;
st[1] = true; // 表示1号点已经被遍历过
q.push(1);

while (q.size())
{
    int t = q.front();
    q.pop();

    for (int i = h[t]; i != -1; i = ne[i])
    {
        int j = e[i];
        if (!st[j])
        {
            st[j] = true; // 表示点j已经被遍历过
            q.push(j);
        }
    }
}
```

### 试除法判定质数

```C++
bool is_prime(int x)
{
    if (x < 2) return false;
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
            return false;
    return true;
}
```

### 试除法分解质因数

```C++
void divide(int x)
{
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
        {
            int s = 0;
            while (x % i == 0) x /= i, s ++ ;
            cout << i << ' ' << s << endl;
        }
    if (x > 1) cout << x << ' ' << 1 << endl;
    cout << endl;
}
```

## 八股中的错误点：

1、DOMContent 函数在 CSS 加载和解析之后
2、obj.value，不会被捕获，会动态获取值（显式闭包捕获）
3、react16，setTimeout状态改变同步；react18就完全异步了
4、this 的隐式绑定，隐式绑定也会丢失
5、函数表达式不会变量提升
6、
普通函数：this 由调用方式决定（谁调用，this 就是谁）
箭头函数：this 由定义位置决定（外层作用域的 this）
7、
普通函数的 this 由调用方式决定
当普通函数被直接调用，而不是作为方法或构造函数：
非严格模式：this 指向 全局对象（浏览器是 window，Node.js 是 global）
严格模式：this 是 undefined
8、await 会执行到当前行的表达式的同步部分执行完，但不会执行后续代码
