---
title: "[形式语言与自动机] 0x0_基础知识"
published: 2025-05-08
lang: zh
---

1. 字母表: 符号(字符) 的非空有穷集.
   > $\Sigma_{1} = \{ 0,1 \}$
   > $\Sigma_{2} = \{a,b,\dots,z \}$
   > $\Sigma_{3} = \{x | x 是一个汉字\}$
2. 字符串: 由字母表中符号组成的**有穷序列**.
   > $\Sigma_{1} = \{ 0,1 \}$, `0`, `1`, `00`, `111011` 均为 $\Sigma_{1}$ 上的字符串.
   > $\Sigma_{2} = \{a,b,\dots,z \}$, `ab`, `adz` 均为 $\Sigma_{2}$ 上的字符串.
3. 空串: $\epsilon$, 0 个字符的串.
   > 字母表 $\Sigma$ 可以是任意的, $\epsilon$ 不是一个字符, 所以 $\epsilon \notin \Sigma$.
   > 单个字符既是字符, 也是字符串. $a \in \Sigma$.
4. 符号表示
   1. 字母表:  $Sigma \ \Sigma$, $Gamma \ \Gamma$
   2. 字符: $a,b,\dots$
   3. 字符串: $\dots, w, x, y, z$
   4. 集合: $A,B,C,\dots$
5. 字符串长度: 字符串中符号所占位置的个数, 记为 $| \cdot|$.
6. 字符串的连接: 将首尾相接得到新字符串的运算, 记为 $x \cdot y$ 或 $xy$.
   > 连接运算是有顺序的, $xy \neq yx$.
   > 对于任意的字符串, $\epsilon \cdot x = x \cdot \epsilon$.
7. 字符串 $x$ 的 $n$ 次幂 ($n \geq 0$).
   $$
   x^n =  
   \begin{cases}  
   \epsilon, & n = 0 \\  
   x^{n-1} x, & n > 0 \\
   \end{cases}
   $$
