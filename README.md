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


# 2023.3.3 - [LC1487] - 606

方法：哈希表

```C++
class Solution {
public:
    vector<string> getFolderNames(vector<string>& names) {
        unordered_map<string, int> um;
        vector<string> res;
        for (auto &name : names) 
        {
            if (!um.count(name))
            {
                res.push_back(name);
                um[name] = 1;
            }
            else 
            {
                int k = um[name];
                while (um.count(name + "(" + to_string(k) + ")")) k ++ ;
                res.push_back(name + "(" + to_string(k) + ")");
                um[name] = k + 1;
                um[name + "(" + to_string(k) + ")"] = 1;
            }
        }
        return res;
    }
};
```

保持敬畏，保持谦逊. 积累、分享，向前看.


# 2023.3.4 - [LC982] - 607

方法：求x子集

```C++
class Solution {
public:
    int countTriplets(vector<int>& nums) {
        unordered_map<int, int> um;
        int n = nums.size();
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < n; j ++ )
                um[nums[i] & nums[j]] ++ ;
        int ans = 0;
        for (int i = 0; i < n; i ++ )
        {
            int x = nums[i] ^ 0xffff;
            for (int j = x; j; j = (j - 1) & x) // 求x的子集，最后记得加上空集
                ans += um[j];
            ans += um[0];
        }
        return ans;
    }
};
```

今日心情较难受.


# 2023.3.5 - [LC1599] - 608

方法：模拟

```C++
class Solution {
public:
    int minOperationsMaxProfit(vector<int>& customers, int boardingCost, int runningCost) {
        int n = customers.size();
        int rm = 0;
        int maxy = 0, sumy = 0, x = 0;
        for (int i = 0; i < n; i ++ )
        {
            rm += customers[i];
            if (rm <= 4)
            {
                sumy += rm * boardingCost - runningCost;
                rm = 0;
            }
            else
            {
                sumy += 4 * boardingCost - runningCost;
                rm -= 4;
            }
            if (sumy > maxy)
            {
                maxy = sumy;
                x = i + 1;
            }
        }
        int x1 = rm / 4;
        int x2 = rm % 4;
        sumy += x1 * 4 * boardingCost - x1 * runningCost;
        if (sumy > maxy) 
        {
            maxy = sumy;
            x = n + x1;
        }
        if (!x2) return x ? x : -1;
        sumy += x2 * boardingCost - runningCost;
        if (sumy > maxy) 
        {
            maxy = sumy;
            x = n + x1 + 1;
        }
        return x ? x : -1;
    }
};
```

今日心情较紧张.

方法：前缀和

# 2023.3.6 - [LC1653] - 609

```C++
class Solution {
public:
    int minimumDeletions(string s) {
        int n = s.size();
        vector<int> va(n + 1), vb(n + 1);
        for (int i = 1; i <= n; i ++ )
        {
            va[i] = va[i - 1] + (s[i - 1] == 'a');
            vb[i] = vb[i - 1] + (s[i - 1] == 'b');
        }
        int res = INT_MAX;
        for (int i = 1; i <= n + 1; i ++ )
            res = min(res, n - (vb[n] - vb[i - 1]) - va[i -1]);
        return res;
    }
};
```

今日心情难过.


# 2023.3.7 - [LC1096] - 610*

先用题解喔，还没有调出来捏~

方法：模拟 + 递归

```C++
class Solution {
public:
    vector<string> braceExpansionII(string expression) {
        set<string> st = dfs(expression, 0, expression.size());
        return vector<string>(st.begin(), st.end());
    }

    set<string> dfs(string &expression, int st, int ed) {
        if (ed - st == 1) 
        {
            set<string> temp;
            temp.insert(expression.substr(st, 1));
            return temp;
        }
        int cnt = 0;
        set<string> res;
        set<string> sst;
        int last = st;
        for (int i = 0; i < ed; i ++ )
        {
            if (cnt == 1 && (expression[i] == ',' || expression[i] == '}')) 
            {
                set<string> ds = dfs(expression, last + 1, i);
                if (sst.empty()) sst = ds;
                else 
                {
                    set<string> sst1;
                    for (const auto &x : sst)
                        for (const auto &y : ds)
                            sst1.insert(x + y);
                    swap(sst, sst1);
                }
                res.insert(sst.begin(), sst.end());
                sst.clear();
                last = i;
            }
            if (cnt == 1 && expression[i]== '{') {
                if (i - last != 1) {
                    set<string> ds = dfs(expression, last + 1, i);
                    if (sst.empty()) sst = ds;
                    else 
                    {
                        set<string> sst1;
                        for (const auto &x : sst)
                            for (const auto &y : ds)
                                sst1.insert(x + y);
                        swap(sst, sst1);
                    }
                    last = i - 1;
                }
            }
            if (expression[i] == '{') cnt ++ ;
            if (expression[i] == '}') cnt -- ;
        }
        return res;
    }
};
```

今日心情较平静.


# 2023.3.8 - [剑指Offer47] - 611

方法：线性DP

```C++
class Solution {
public:
    int maxValue(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        int dp[n + 1][m + 1];
        memset(dp, 0, sizeof dp);
        for (int i = 0; i < n; i ++ )
            for (int j = 0; j < m; j ++ )
                dp[i + 1][j + 1] = grid[i][j] + max(dp[i + 1][j], dp[i][j + 1]);
        return dp[n][m];
    }
};
```

今日心情较复杂.


# 2023.3.9 - [LC2379] - 612

方法：双指针

```C++
class Solution {
public:
    int minimumRecolors(string blocks, int k) {
        int i = 0, j = 0;
        int n = blocks.size();
        int res = k;
        int cnt = 0;
        while (i < n && j < n)
        {
            while (j < n && j - i + 1 <= k) 
            {
                if (blocks[j] == 'W') cnt ++ ;
                j ++ ;
            }
            // cout << i << " " << j << " " << cnt << endl;
            res = min(res, cnt);
            if (blocks[i] == 'W') cnt -- ;
            i ++ ;
        }
        return res;
    }
};
```


# 2023.3.10 - [LC2379] - 613

方法：模运算

```C++
class Solution {
public:
    int minSubarray(vector<int>& nums, int p) {
        unordered_map<int, int> um;
        um[0] = 0;
        int res = INT_MAX;
        int n = nums.size();
        int accp = accumulate(nums.begin(), nums.end(), 0LL) % p;
        if (!accp) return 0;
        int sum = 0;
        for (int i = 1; i <= n; i ++ )
        {
            sum = (sum + nums[i - 1]) % p;
            if (um.count((sum - accp + p) % p))
                res = min(res, i - um[(sum - accp + p) %p]);
            um[sum] = i;
        }
        return res == n ? -1 : res;
    }
};
```


# 2023.3.11 - [面试题17.05] - 614

方法：前缀和

```C++
class Solution {
public:
    vector<string> findLongestSubarray(vector<string>& array) {
        map<int, int> mp;
        mp[0] = 0;
        int x = 0, y = 0;
        int res = INT_MIN;
        pair<int, int> p;
        for (int i = 0; i < array.size(); i ++ )
        {
            string s = array[i];
            if (isalpha(s[0])) x ++ ;
            else y ++ ;
            if (mp.count(x - y))
            {
                if(i + 1 - mp[x - y] > res)
                {
                    res = i + 1 - mp[x - y];
                    p = {mp[x - y], i + 1};
                }
            }
            else mp[x - y] = i + 1;
        }
        vector<string> v;
        for (int i = p.first; i < p.second; i ++ ) v.push_back(array[i]);
        return v;
    }
};
```


# 2023.3.12 - LC1617 - 615 - Hard

今天是理解官方题解的一天.

方法：二进制枚举、树的直径

```C++
class Solution {
public:
    vector<int> countSubgraphsForEachDiameter(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto &edge : edges)
        {
            int x = edge[0] - 1;
            int y = edge[1] - 1;
            adj[x].emplace_back(y);
            adj[y].emplace_back(x);
        }
        
        function<int(int, int&, int &)> dfs = [&](int root, int& mask, int& diameter) -> int {
            int first = 0, second = 0;
            mask &= ~(1 << root);
            for (int vertex : adj[root])
            {
                if (mask & (1 << vertex))
                {
                    mask &= ~(1 << vertex);
                    int distance = 1 + dfs(vertex, mask, diameter);
                    if (distance > first)
                    {
                        second = first;
                        first = distance;
                    }
                    else if (distance > second) second = distance;
                }
            }
            diameter = max(diameter, first + second);
            return first;
        };

        vector<int> ans(n - 1);
        for (int i = 1; i < 1 << n; i ++ )
        {
            int root = 32 - __builtin_clz(i) - 1;
            int mask = i;
            int diameter = 0;
            dfs(root, mask, diameter);
            if (mask == 0 && diameter > 0) ans[diameter - 1] ++ ;
        }
        return ans;
    }
};
```


# 2023.3.13 - LC2383 - 616 - Easy

```C++
class Solution {
public:
    int minNumberOfHours(int initialEnergy, int initialExperience, vector<int>& energy, vector<int>& experience) {
        int n = energy.size();
        int res = 0;
        for (int i = 0; i < n; i ++ )
        {
            if (initialEnergy <= energy[i])
            {
                res += energy[i] - initialEnergy + 1;
                initialEnergy = energy[i] + 1;
            }
            if (initialExperience <= experience[i])
            {
                res += experience[i] - initialExperience + 1;
                initialExperience = experience[i] + 1;
            }
            initialEnergy -= energy[i];
            initialExperience += experience[i];
        }
        return res;
    }
};
```


# 2023.3.14 - LC1605 - 617 - Middle

方法：贪心

```C++
class Solution {
public:
    vector<vector<int>> restoreMatrix(vector<int>& rowSum, vector<int>& colSum) {
        int i = 0, j = 0;
        int n = rowSum.size(), m = colSum.size();
        vector<vector<int>> v(n, vector<int>(m));
        while (i < n && j < m)
        {
            int x = min(rowSum[i], colSum[j]);
            v[i][j] = x;
            rowSum[i] -= x;
            colSum[j] -= x;
            if (rowSum[i] == 0) i ++ ;
            else j ++ ; 
        }
        return v;
    }
};
```