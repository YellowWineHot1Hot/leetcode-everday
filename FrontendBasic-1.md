# 事件代理

## 未使用事件代理

```javascript
<body>
    <ul id="list">
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
    </ul>

    <script>
        var ul_list = document.getElementById('list');
        var lis = ul_list.getElementsByTagName('li');

        for (var i = 0; i < lis.length; i++) {
            lis[i].onclick = function () {
                this.style.color = 'blue';
            };
        }
    </script>
</body>
```

# 使用事件代理

```javascript
<body>
    <button id="btn">点击新增li标签</button>
    <ul id="list">
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
        <li>列表项</li>
    </ul>

    <script>
        var list = document.getElementById('list');
        var btn = document.getElementById('btn');

        list.onclick = function(e){
            //点击的子元素
            e.target.style.color = 'blue';
        }
    </script>
</body>
```

> 参考: https://blog.csdn.net/Wps1919/article/details/124680326
