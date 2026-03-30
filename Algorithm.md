# JS数据结构

```javascript
// 字符串追加
var str1 = "123";
var str2 = str1 + "456";

var str1 = "123";
var str2 = str1.concat("456"); // new, old

// 字符串截取
var str1 = "123";
var str = str1.slice(1, 2); // [start, end)

// 字符串翻转
var str1 = "abc";
var a1 = str1.split("");
var a2 = a1.reverse(); // new, new
var str2 = a2.join("");
console.log(str2);

// sdasd;
// 数组
var arr = [1, 2, 3]; // 可以模拟栈和队列
arr.unshift(0); // push_front // size
arr.shift(); // pop_front // firstElement
arr.push(4); // push_back // size
arr.pop(); // pop_back // endElement
print(arr);

var arr = [2, 4, 6, 8, 10];
delete arr[0]; // 第一个元素变为undefined/empty
console.log(arr);
```

# 算法3
