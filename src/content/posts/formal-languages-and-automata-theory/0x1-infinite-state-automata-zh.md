---
title: "形式语言与自动机 | 0x1_有穷状态自动机"
published: 2025-05-08
lang: zh
tags:
   - 笔记
   - 形式语言与自动机
---

## 有穷自动机 FA

### 有穷状态系统  

在系统的运行过程中, 系统的状态在**有限状态**间不断变化, 每个状态可以**迁移到零个或多个状态**, 系统的**输入决定**执行哪个**状态的迁移**.  

> $电视开 \xleftrightharpoons[关闭]{开启} 电视关$  
> $红灯 \leftrightharpoons 黄灯 \leftrightharpoons 绿灯 \leftrightharpoons 红灯$

### 确定型有穷自动机 DFA

**定义**: 确定的有穷自动机 (DFA, Deterministic Finite Automaton).  

$A$为五元组$(Q, \Sigma, \delta, q_0, F)$.  

1. $Q$: **有穷**状态集  
2. $\Sigma$: **有穷**输入符号集或字母表；(a finite set of input symbols/alphabet)  
3. $\delta: Q \times \Sigma \to Q$: 状态转移函数(a transition function)  
   >  通过当前状态 $q$ 和输入符号 $\Sigma$ 来确定, 状态该如何切换. 所以要做一个笛卡尔积.
4. $q_0 \in Q$: **初始状态**(a start state)  
   > 系统状态从 $q_0$ 开始.
5. $F \subseteq Q$: 终结状态集或**接受状态**集(a set of accepting states)

> 设计DFA，在任何由0和1构成的串中，接受含有01子串的全部串.  
>
> - 字母表 $\Sigma = \{0,1\}$  
> - 有穷状态集 $Q$:  
>   - 没发现 01 子串，且 0 也还没出现 ($q_0$-初始状态)  
>   - 没发现 01 子串，但刚刚已经读入了一个 0，只需再读入一个 1 就符合条件了 ($q_1$)  
>   - 已经发现 01 子串，不再关心串的其余部分 ($q_2$-终止)  
> - 状态转换函数：
> $$ \begin{aligned} & \delta(q_0, 0) = q_1, \, \delta(q_1, 0) = q_1, \, \delta(q_2, 0) = q_2 \\ & \delta(q_0, 1) = q_0, \, \delta(q_1, 1) = q_2, \, \delta(q_2, 1) = q_2 \end{aligned} $$

### 非确定型有穷自动机 NFA
