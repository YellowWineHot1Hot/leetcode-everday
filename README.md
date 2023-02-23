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