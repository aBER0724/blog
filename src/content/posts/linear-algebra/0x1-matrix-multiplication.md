---
title: "线性代数 | 0x1_矩阵乘法"
published: 2025-06-13
lang: zh
tags:
   - 笔记
   - 线性代数
---

## 矩阵乘法 Matrix Multiplication

四种不同的计算方法.

### 内积 Inner Product

$$C = AB$$
$$c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}$$

行 $\times$ 列 的和.  

$$
A = \begin{bmatrix} 
   1 & 2 \\ 
   3 & 4 \\ 
   5 & 6 
\end{bmatrix} \quad 
B = \begin{bmatrix}
   -1 & 1 \\ 
   3 & 2 
\end{bmatrix}
$$
$$
C = AB = \begin{bmatrix}
   (-1) \times 1 + 3 \times 2 & 1 \times 1 + 2 \times 2 \\ 
   (-1) \times 3 + 3 \times 4 & 1 \times 3 + 2 \times 4 \\ 
   (-1) \times 5 + 3 \times 6 & 1 \times 5 + 2 \times 6 
\end{bmatrix}
$$

### 列组合 Combination of Columns 

$AB$ 也相当于 $A$ 与 $B$ 的每列进行相乘.

$$
\begin{matrix}
AB = & A[b_1 \ b_2 \ \cdots \ b_p] \\
   = & Ab_1 + Ab_2 + \cdots + Ab_p
\end{matrix}
$$

### 行组合 Combination of Rows

$AB$ 也相当于 $A$ 与 $B$ 的行组合.

$$c_{ij} = a_{i1}b^T_1 + a_{i2}b^T_2 + \cdots + a_{in}b^T_n$$

$$ 
\begin{bmatrix} 
   1 & 2 \\ 
   3 & 4 \\ 
   5 & 6 
\end{bmatrix} 
\begin{bmatrix} 
   -1 & 1 \\ 
   3 & 2
\end{bmatrix} 
= 
\begin{bmatrix} 
   1[-1 \quad 1] + 2[3 \quad 2] \\ 
   3[-1 \quad 1] + 4[3 \quad 2] \\ 
   5[-1 \quad 1] + 6[3 \quad 2]
\end{bmatrix} 
$$

### 矩阵和 Summation of Matrices

$$c_{ij} = a_1b^T_1 + a_2b^T_2 + \cdots + a_nb^T_n$$

多个矩阵 $a_ib^T_j$ 求和.

$$
\begin{bmatrix} 
   1 & 2 \\ 
   3 & 4 \\ 
   5 & 6
\end{bmatrix} 
\begin{bmatrix} 
   -1 & 1 \\ 
   3 & 2 
\end{bmatrix} = 
\begin{bmatrix} 
   \begin{bmatrix} 
      1 \\ 
      3 \\ 
      5 
   \end{bmatrix} 
   \begin{bmatrix} 
      -1 & 1 
   \end{bmatrix} + 
   \begin{bmatrix} 
      2 \\ 
      4 \\ 
      6 
   \end{bmatrix} 
   \begin{bmatrix} 
      3 & 2 
   \end{bmatrix} 
\end{bmatrix}
$$

#### 块组合 Combination of Blocks

Partition: 可以将矩阵按行和列拆分成块, 每个块都可以当作一个矩阵.

$$
A = \begin{bmatrix}
   1 & 3 & 4 & 2 \\ 
   0 & 5 & -1 & 6 \\ 
   1 & 0 & 3 & -1 
\end{bmatrix}  \quad
B = \begin{bmatrix}
   1 & 0 & 3 \\ 
   1 & 2 & 0 \\ 
   2 & -1 & 2 \\ 
   0 & 3 & 1 
 \end{bmatrix}
$$

$$
A = \begin{bmatrix}
   A_{11} & A_{12} \\ 
   A_{21} & A_{22} 
\end{bmatrix} \quad 
B = \begin{bmatrix}
   B_{11} & B_{12} \\ 
   B_{21} & B_{22} 
\end{bmatrix}
$$

$$
\begin{matrix}
AB = & 
   \begin{bmatrix}
      A_{11} & A_{12} \\ 
      A_{21} & A_{22} 
   \end{bmatrix} 
   \begin{bmatrix}
      B_{11} & B_{12} \\ 
      B_{21} & B_{22} 
   \end{bmatrix} \\
   = & \begin{bmatrix} A_{11}B_{11} + A_{12}B_{21} & A_{11}B_{12} + A_{12}B_{22} \\ A_{21}B_{11} + A_{22}B_{21} & A_{21}B_{12} + A_{22}B_{22} \end{bmatrix}
\end{matrix}
$$

对复杂矩阵进行拆分后, 可以简化一部分运算.

$$
A = \begin{bmatrix}
   1 & 0 & 0 & 0 \\ 
   0 & 1 & 0 & 0 \\ 
   6 & 8 & 5 & 0 \\ 
   -7 & 9 & 0 & 5 
\end{bmatrix} \quad 
A = 
\begin{bmatrix}
   I_2 & O \\ 
   B & 5I_2 
\end{bmatrix}
$$

$$
A^2 = \begin{bmatrix}
   I_2 & O \\ 
   B & 5I_2 
\end{bmatrix} 
\begin{bmatrix}
   I_2 & O \\ 
   B & 5I_2 
\end{bmatrix} = 
\begin{bmatrix}
   I_2 & O \\ 
   6B & 25I_2 
\end{bmatrix}
$$

## 矩阵乘法意义

$$y \leftarrow A \leftarrow v \leftarrow B \leftarrow x$$
$$y \leftarrow C(A \leftarrow B) \leftarrow x$$ 

## 矩阵乘法的性质

1. $AB \not = BA$
2. $A$,$B$ 是 $k \times m$, $C$ 是 $m \times n$, $P,Q$ 是 $n \times p$.
   - 对任意的 $s$, $s(AC) = (sA)C = A(sC)$  
   - $(A + B)C = AC + BC$  
   - $C(P+Q)=CP+CQ$  
   - $I_kA = A = AI_m$  
   - 任何矩阵与零矩阵相乘结果都是**零矩阵**.
3. 对于 $n \times n$ 的矩阵 $A$: $A^k = AA \cdots A(k次), A^1=A, A^0 = I_n$
4. $A$ 是 $k \times m$, $C$ 是 $m \times n$.
   - $(AC)^T = C^TA^T$

   > $AC: k \times m \cdot m \times n \rightarrow k \times n$
   > $(AC)^T: (k \times n)^T \rightarrow n \times k$  
   > $A^TC^T: m \times k \cdot n \times m \not \rightarrow D.N.E.$  
   > $C^TA^T: n \times m \cdot m \times k \rightarrow n \times k \rightarrow (AC)^T$

5. 对角矩阵相乘直接将对角线相乘即可.
   $$
   A = \begin{bmatrix}
      1 & 0 & 0 \\
      0 & 2 & 0 \\ 
      0 & 0 & 3 
   \end{bmatrix} \quad 
   B = \begin{bmatrix}
      3 & 0 & 0 \\
      0 & -1 & 0 \\ 
      0 & 0 & 2 
   \end{bmatrix} \quad 
   AB = \begin{bmatrix}
      3 & 0 & 0 \\
      0 & -2 & 0 \\ 
      0 & 0 & 6 
   \end{bmatrix}
   $$

6. $A$,$B$ 是 $k \times m$, $C$ 是 $m \times n$, $P,Q$ 是 $n \times p$.
   - A(CP) = (AC)P, A(CP) 和 (AC)P 的结果相同, 但计算量不同.
   - 假设 $k = 1, m = 1000, n = 1, p = 1000$.
     - A(CP): $m \times n \times p + k \times m \times p = 2 \cdot 10^6$
     - (AC)P: $k \times m \times n + k \times n \times p = 2 \cdot 10^3$
