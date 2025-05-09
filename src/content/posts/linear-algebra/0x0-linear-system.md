---
title: "线性代数 | 0x0_线性系统"
published: 2025-05-09
lang: zh
tags:
   - 笔记
   - 线性代数
---

## 向量 Vector

$$
\boldsymbol{v} =
\begin{bmatrix}
1 \\
2\\
3\\
\end{bmatrix}
$$

### 向量集合 Vector Set  

$\mathcal{R}^n$: 包含 $n$ 个元素的向量的集合.  

### 向量运算性质

 1. $\boldsymbol{u} + \boldsymbol{v} = \boldsymbol{v} + \boldsymbol{u}$
 2. $(\boldsymbol{u} + \boldsymbol{v}) + \boldsymbol{w} = \boldsymbol{u} + (\boldsymbol{v} + \boldsymbol{w})$
 3. $\boldsymbol{0} + \boldsymbol{u} = \boldsymbol{u}$
 4. $\boldsymbol{u}' + \boldsymbol{u} = \boldsymbol{0}$
      > $\boldsymbol{u}' = - \boldsymbol{u}$
 5. $1 \boldsymbol{u} = \boldsymbol{u}$
 6. $(ab)\boldsymbol{u} = a(b\boldsymbol{u})$
 7. $a(\boldsymbol{u} + \boldsymbol{v}) = a\boldsymbol{u} + a\boldsymbol{v}$
 8. $(a + b)\boldsymbol{v} = a\boldsymbol{u} + b\boldsymbol{u}$

## 线性系统 Linear System

> Linear System = System of Linear Equations  
> 线性系统 = 多元一次联立方程式

$$
\begin{array}{lcl}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\qquad \qquad \qquad \quad \cdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m \\
\end{array}
$$

### 标准/单位向量 Standard/Unit Vector  

$$
\boldsymbol{e}_1 =
\begin{bmatrix}
   1 \\
   0 \\
   \vdots \\
   0
\end{bmatrix},
\bold{e}_2 =
\begin{bmatrix}
   0 \\
   1 \\
   \vdots \\
   0
\end{bmatrix},
\cdots,
\boldsymbol{e}_n =
\begin{bmatrix}
   0 \\
   0 \\
   \vdots \\
   1
\end{bmatrix}
$$

将每个 Standard Vector 代入线性系统得到:  
$$
\boldsymbol{e}_1 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{11} \\
   a_{21} \\
   \vdots \\
   a_{m1}
\end{matrix},
\boldsymbol{e}_2 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{12} \\
   a_{22} \\
   \vdots \\
   a_{m2}
\end{matrix},
\cdots,
\boldsymbol{e}_n \xrightarrow[System]{Linear}
\begin{matrix}
   a_{1n} \\
   a_{2n} \\
   \vdots \\
   a_{mn}
\end{matrix}
$$

如果 Standard Vector 对应乘上 $x_n$ 得到:  
$$
x_1\boldsymbol{e}_1 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{11}x_1 \\
   a_{21}x_1 \\
   \vdots \\
   a_{m1}x_1
\end{matrix},
x_2\boldsymbol{e}_2 \xrightarrow[System]{Linear}
\begin{matrix}
   a_{12}x_2 \\
   a_{22}x_2 \\
   \vdots \\
   a_{m2}x_2
\end{matrix},
\cdots,
x_n\boldsymbol{e}_n \xrightarrow[System]{Linear}
\begin{matrix}
   a_{1n}x_n \\
   a_{2n}x_n \\
   \vdots \\
   a_{mn}x_n
\end{matrix}
$$

最终将结果相加:  
$$
\begin{matrix}
   x_1 \\
   x_2 \\
   \vdots \\
   x_n
\end{matrix}
\xrightarrow[System]{Linear}
\begin{matrix}
   a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n  = b_1\\
   a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n  = b_2\\
   \vdots \\
   a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n  = b_m\\
\end{matrix}
$$

## 矩阵 Matrix  

`m` 行 `n` 列 (`m` x `n`)

$$
A =
\begin{bmatrix}
   a_{11} & a_{12} & \cdots & a_{1n} \\
   a_{21} & a_{22} & \cdots & a_{2n} \\
   \vdots & \ddots & \cdots & \vdots \\
   a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$  

$$
A = [\boldsymbol{a}_1 \ \boldsymbol{a}_2 \ \cdots \ \boldsymbol{a}_n]
$$

元素下标用 `(i,j)` 表示.  

### 矩阵运算

> 当矩阵大小相等时(大小都是 `m` x `n`), 可以进行计算.  

将对应元素进行计算.  

$$
A =
\begin{bmatrix}
   1 & 4 \\
   2 & 5 \\
   3 & 6
\end{bmatrix}
B =
\begin{bmatrix}
   6 & 9 \\
   8 & 0 \\
   9 & 2
\end{bmatrix}
$$

$$
9B =
\begin{bmatrix}
   54 & 81 \\
   72 & 0 \\
   81 & 18
\end{bmatrix}
A + B =
\begin{bmatrix}
   7 & 13 \\
   10 & 5 \\
   12 & 8
\end{bmatrix}
A - B =
\begin{bmatrix}
   -5 & -5 \\
   -6 & 5 \\
   -6 & 4
\end{bmatrix}
$$

### 矩阵运算性质

1. $A + B = B + A$
2. $(A + B) + C = A +(B + C)$
3. $(st)A = s(tA)$
4. $s(A + B) = sA + sB$
5. $(s + t)A = sA + tA$

### 常用矩阵

#### 方矩阵 Square Matrix

`m` = `n` 的矩阵. 方矩阵存在对角线.

##### 上三角矩阵 Upper Triangular Matrix

对角线以下元素全为 `0`.

$$
\begin{bmatrix}
   a_{11} & a_{12} & a_{13} \\
   0 & a_{22} & a_{23} \\
   0 & 0 & a_{33}
\end{bmatrix}
$$  

##### 下三角矩阵 Lower Triangular Matrix

对角线以上元素全为 `0`.

$$
\begin{bmatrix}
   a_{11} & 0 & 0 \\
   a_{21} & a_{22} & 0 \\
   a_{31} & a_{32} & a_{33}
\end{bmatrix}
$$  

##### 对角矩阵 Diagonal Matrix

除了对角线以上元素全为 `0`.

$$
\begin{bmatrix}
   a_{11} & 0 & 0 \\
   0 & a_{22} & 0 \\
   0 & 0 & a_{33}
\end{bmatrix}
$$  

##### 单位矩阵 Identity Matrix

除了对角线以上元素全为 `0`, 对角线以上元素全为 `1`. 表示为 $I_n$, $n$ 是方矩阵的大小.

$$
\begin{bmatrix}
   1 & 0 & 0 \\
   0 & 1 & 0 \\
   0 & 0 & 1
\end{bmatrix}
$$  

##### 零矩阵 Zero Matrix

元素全为 `0` 的矩阵. 表示为 $O_{m \times n}$, $m \times n$ 是矩阵的大小.

$$
\begin{bmatrix}
   0 & 0 & 0 \\
   0 & 0 & 0 \\
   0 & 0 & 0
\end{bmatrix}
$$  

### 矩阵转置 Transpose  

矩阵转置, 行$\leftrightarrow$列. 元素位置改变: $(i,j) \rightarrow (j,i)$.  
转置矩阵表示为 $A^T$.

$$
A =
\begin{bmatrix}
6 & 9 \\
8 & 0 \\
9 & 2
\end{bmatrix}
\xrightarrow{Transpose}
A^T =
\begin{bmatrix}
6 & 8 & 9 \\
9 & 0 & 2
\end{bmatrix}
$$

$(A^T)^T = A$  
$(sA)^T = sA^T$
$(A + B)^T = A^T + B^T$

#### 对称矩阵 Symmetric matrix

对称的矩阵一定是**方矩阵**.

$A^T = A$

### 矩阵-向量乘法

> **向量元素个数 = 矩阵列数**

$$
A =
\begin{bmatrix}
   a_{11} & a_{12} & \cdots & a_{1n} \\
   a_{21} & a_{22} & \cdots & a_{2n} \\
   \vdots & \vdots & \ddots & \vdots \\
   a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
\hspace{1cm}
\boldsymbol{x} =
\begin{bmatrix}
   x_1 \\
   x_2 \\
   \vdots \\
   x_n
\end{bmatrix}
$$

$$
\begin{align}
   A \boldsymbol{x}  & =
   \begin{bmatrix}
      a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n \\
      a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n \\
      \vdots \\
      a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n
   \end{bmatrix} \\
   & =
   x_1
   \begin{bmatrix}
      a_{11} \\
      \vdots \\
      a_{m1}
   \end{bmatrix}
   + x_2
   \begin{bmatrix}
      a_{12} \\
      \vdots \\
      a_{m2}
   \end{bmatrix}
   + \cdots +
   x_n
   \begin{bmatrix}
      a_{1n} \\
      \vdots \\
      a_{mn}
   \end{bmatrix}
\end{align}
$$

#### 矩阵-向量乘法性质

1. $A(\boldsymbol{u} + \boldsymbol{v}) = A\boldsymbol{u} + A\boldsymbol{v}$
2. $A(c\boldsymbol{u}) = c(A\boldsymbol{u}) = (cA)\boldsymbol{u}$
3. $(A + B)\boldsymbol{u} = A\boldsymbol{u} + B\boldsymbol{u}$
4. $A \boldsymbol{0}$ 是 `m`x`1` 零向量.
5. $\boldsymbol{0v}$ 也是 `m`x`1` 零向量.
6. $I_n\boldsymbol{v} = \boldsymbol{v}$

#### 怎么证明 $A = B$?  

$A \boldsymbol{e}_j = \boldsymbol{a}_j$.

$$
\begin{matrix}
   A \boldsymbol{e}_1 = B \boldsymbol{e}_1 \rightarrow \boldsymbol{a}_1 = \boldsymbol{b}_1 \\
   A \boldsymbol{e}_2 = B \boldsymbol{e}_2 \rightarrow \boldsymbol{a}_2 = \boldsymbol{b}_2 \\
   \qquad \qquad \cdots \\
   A \boldsymbol{e}_n = B \boldsymbol{e}_n \rightarrow \boldsymbol{a}_n = \boldsymbol{b}_n \\
\end{matrix}
\quad \Rightarrow \quad
A = B
$$

所以要确认 $A$ 与 $B$ 是否相等, 只需要检查 $\boldsymbol{a}_1,\cdots,\boldsymbol{a}_n$ 是否等于 $\boldsymbol{b}_1,\cdots,\boldsymbol{b}_n$.

## 线性组合 Linear Combination

向量集合 $\{ \boldsymbol{u}_1, \boldsymbol{u}_2, \cdots, \boldsymbol{u}_k\}$.

$\boldsymbol{v} = c_1\boldsymbol{u}_1 + c_2\boldsymbol{u}_2 + \cdots +c_k\boldsymbol{u}_k$ 称为**线性组合**.  

$c_1, c_2, \cdots, c_k$ 是 coefficients.  
相当于向量与矩阵相乘.

### 方程组是否有解?  

方程组是否有解, 可以换句话说: **$A\boldsymbol{x} = b$ 中, $b$ 是 $A$ 的列的线性组合?**

如果两个向量非平行, 可以组合成任意的向量.  
所以当 $A$ 的列不平行时, 是有解的. 但 $A$ 的列平行时, 不一定无解.

#### Example 1

$$
3x_1 + 6x_2 = 3 \\
2x_1 + 4x_2 = 4
$$

$$
Ax = b \\
A =
\begin{bmatrix}
   3 & 6 \\
   2 & 4
\end{bmatrix}
\hspace{1cm}
x =
\begin{bmatrix}
   x_1 \\
   x_2
\end{bmatrix}
\hspace{1cm}
b =
\begin{bmatrix}
   3 \\
   4
\end{bmatrix}
$$

> 要确认 $\begin{bmatrix} 3 \\ 4 \end{bmatrix}$ 是不是 $\begin{Bmatrix} \begin{bmatrix} 3 \\ 2 \end{bmatrix}, \begin{bmatrix} 6 \\ 4 \end{bmatrix} \end{Bmatrix}$ 的线性组合?

$\begin{bmatrix} 3 \\ 4 \end{bmatrix}$ 无法通过 $c_1 \begin{bmatrix} 3 \\ 2 \end{bmatrix} + c_2 \begin{bmatrix} 6 \\ 4 \end{bmatrix}$ 得到, 所以这个方程组无解.

#### Example 2  

$$
2x_1 + 3x_2 = 4 \\
3x_1 + 1x_2 = -1
$$

$$
A =
\begin{bmatrix}
   2 & 3 \\
   3 & 1
\end{bmatrix}
\hspace{1cm}
x =
\begin{bmatrix}
   x_1 \\
   x_2
\end{bmatrix}
\hspace{1cm}
b =
\begin{bmatrix}
   4 \\
   -1
\end{bmatrix}
$$  

$$
-1
\begin{bmatrix}
   2 \\
   3
\end{bmatrix}
+
2
\begin{bmatrix}
   3 \\
   1
\end{bmatrix}
=
\begin{bmatrix}
   4 \\
   -1
\end{bmatrix}
$$

$b$ 可以通过线性组合得到, 所以方程组有解.
