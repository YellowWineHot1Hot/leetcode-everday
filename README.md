# leetcode-everday

这是一个力扣每日一题的记录本，每日学习感受与总结也会记录在此.

# project undos

还需要：
1. 文件组织调整
2. C++编译环境
3. md语法学习及插件安装

# 2023.2.22 - [LC1140](https://leetcode.cn/problems/stone-game-ii/description/) - 596

今天的每日一题不太会做，参考灵神[代码](https://leetcode.cn/problems/stone-game-ii/solutions/2125753/jiao-ni-yi-bu-bu-si-kao-dong-tai-gui-hua-jjax/).

方法：dfs、dp (both weak)

```C++
class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        int s = 0, n = piles.size(), f[n][n + 1];
        for (int i = n - 1; i >= 0; i -- )
        {
            s += piles[i];
            for (int m = 1; m <= i / 2 + 1; m ++ )
            {
                if (i + m * 2 >= n) f[i][m] = s;
                else
                {
                    int mn = INT_MAX;
                    for (int x = 1; x <= m * 2; x ++ )
                        mn = min(mn, f[i + x][max(m, x)]);
                    f[i][m] = s - mn;
                }
            }
        }
        return f[0][1];
    }
};
```

今天感受：增量学习


# 2023.2.23 - [LC1238](https://leetcode.cn/problems/circular-permutation-in-binary-representation/description/) - 597

今日的每日一题依然不会做，官方[题解](https://leetcode.cn/problems/circular-permutation-in-binary-representation/solutions/2126240/xun-huan-ma-pai-lie-by-leetcode-solution-6e40/)说是格雷码，有公式解.

方法：构造（归纳 / 数学）

```C++
class Solution {
public:
    vector<int> circularPermutation(int n, int start) {
        vector<int> ret;
        ret.reserve(1 << n);
        ret.push_back(0);
        for (int i = 1; i <= n; i ++ 1)
        {
            int m = ret.size();
            for (int j = m - 1; j >= 0; j -- )
                ret.push_back(ret[j] | (1 << ()));
        }
        return ret;
    }
};
```

今日心情较平静.


# 2023.2.24 - [LC2357 and LC445] - 598, 599

好像统计错误，之前做过的一道题统计为598

方法：
1. map
2. 模拟加法

```C++
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        auto x1 = l1, x2 = l2;
        vector<int> v1, v2;
        while (x1) v1.push_back(x1 -> val), x1 = x1 -> next; reverse(v1.begin(), v1.end());
        while (x2) v2.push_back(x2 -> val), x2 = x2 -> next; reverse(v2.begin(), v2.end());
        int num = 0;
        if (v1.size() < v2.size()) swap(v1, v2);
        vector<int> v(v1.size());
        for (int i = 0; i < v1.size() || i < v2.size(); i ++ )
        {
            if (i < v2.size())
            {
                v[i] = (v1[i] + v2[i] + num) % 10;
                num = (v1[i] + v2[i] + num) / 10;
            }
            else 
            {
                v[i] = (v1[i] + num) % 10;
                num = (v1[i] + num) / 10;
            }
        }
        if (num) v.push_back(num);
        ListNode* l;
        ListNode* lt = nullptr;
        for (int i = 0; i < v.size(); i ++ )
        {
            if (lt) l = new ListNode(v[i], lt); 
            else l = new ListNode(v[i]);
            lt = l;
        }
        return l;
    }
};
```

今日心情较阴.


# 2023.2.25 - [LC1247] - 600

稍简单的题，竟然还看题解了，需要模拟一下并且注意只有两种字母.

方法：贪心

```C++
class Solution {
public:
    int minimumSwap(string s1, string s2) {
        int n = s1.size();
        int xy = 0, yx = 0;
        for (int i = 0; i < n; i ++ )
        {
            if (s1[i] == 'x' && s2[i] == 'y') xy ++ ;
            if (s1[i] == 'y' && s2[i] == 'x') yx ++ ;
        }
        if ((xy + yx) % 2) return -1; 
        return xy / 2 + yx / 2 + xy % 2 + yx % 2;
    } 
};
```

今日心情良好.


# 2023.2.26 - [LC1255] - 601

仍然看了一眼题解，很快写出.

方法：状压DP

```C++
class Solution {
public:
    int maxScoreWords(vector<string>& words, vector<char>& letters, vector<int>& score) {
        vector<int> cnt(26);
        for (int i = 0; i < letters.size(); i ++ ) cnt[letters[i] - 'a'] ++ ;
        int n = words.size();
        int gd = 0;
        for (int i = 0; i < 1 << n; i ++ ) {
            vector<int> v(26);
            for (int j = 0; j < n; j ++ ) {
                if ((i >> j) & 1) {
                    for (auto c : words[j]) v[c - 'a'] ++ ;
                }
            }
            int ngd = 0, flag = 0;
            for (int j = 0; j < 26; j ++ ) {
                if (v[j] > cnt[j]) {
                    flag = 1;
                    break;
                }
                ngd += v[j] * score[j];
            }
            if (!flag) gd = max(gd, ngd);
        }
        return gd;
    }
};
```

今日心情复杂.

# 2023.2.27 - [LC1144] - 602

选用[灵神](https://leetcode.cn/u/endlesscheng/)更加简洁的写法.

方法：贪心

```C++
class Solution {
public:
    int movesToMakeZigzag(vector<int>& nums) {
        int n = nums.size();
        vector<int> v(2);
        for (int i = 0 ; i < nums.size(); i ++ )
        {
            int l = i ? nums[i - 1] : INT_MAX;
            int r = i < n - 1 ? nums[i + 1] : INT_MAX;
            v[i % 2] += max(nums[i] - min(l, r) + 1, 0);
        }
        return min(v[0], v[1]);
    }
};
```

今日心情平静.


# 2023.2.28 - [LC2363] - 603

水题

```C++
class Solution {
public:
    vector<vector<int>> mergeSimilarItems(vector<vector<int>>& items1, vector<vector<int>>& items2) {
        map<int, int> mp;
        for (int i = 0; i < items1.size() || i < items2.size(); i ++ )
        {
            if (i < items1.size()) mp[items1[i][0]] += items1[i][1];
            if (i < items2.size()) mp[items2[i][0]] += items2[i][1];
        }
        vector<vector<int>> res;
        for (auto [a, b] : mp) res.push_back({a, b});
        return res;
    }
};
```

今日心情较平静.


# 2023.3.1 - [LC2373] - 604

水题

```C++
class Solution {
public:
    vector<vector<int>> largestLocal(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<int>> vv(n - 2, vector<int>(m - 2));
        for (int i = 1; i < n - 1; i ++ ) 
        {
            for (int j = 1; j < m - 1; j ++ )
            {
                int t = INT_MIN;
                for (int u = -1; u <= 1; u ++ )
                    for (int v = -1; v <= 1; v ++ )
                        t = max(t, grid[i + u][j + v]);
                vv[i - 1][j - 1] = t;
            }
        }
        return vv;
    }
};
```

今日心情较难过.


# 2023.3.2 - [LC 面试题 05.02] - 605

方法：模拟

```C++
class Solution {
public:
    string printBin(double num) {
        if (num == 0.0) return "0";
        string s = "0.";
        int cnt = 0;
        while (cnt < 30)
        {
            num *= 2;
            if (num >= 1) 
            {
                num -- ;
                s += '1';
                if (num == 0.0) return s;
            }
            else s += '0';
            cnt ++ ;
        }
        return "ERROR";
    }
};
```

今日心情挺难过的.