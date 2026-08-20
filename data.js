const source = {
  overview: {
    label: "总览主线",
    range: "上篇 00:00–08:32 · 下篇 00:00–03:54",
    url: "https://www.bilibili.com/video/BV1aeUWYUEiT/"
  },
  determinant: {
    label: "行列式",
    range: "上篇 08:32–01:09:36 · 下篇 03:54–01:04:36",
    url: "https://www.bilibili.com/video/BV1shzdYqEXq/?t=234"
  },
  matrix: {
    label: "矩阵",
    range: "上篇 01:09:36–02:11:48 · 下篇 01:04:36–03:54:32",
    url: "https://www.bilibili.com/video/BV1shzdYqEXq/?t=3876"
  },
  vector: {
    label: "向量",
    range: "上篇 02:42:29–02:53:00 · 下篇 03:54:32–05:00:58",
    url: "https://www.bilibili.com/video/BV1shzdYqEXq/?t=14072"
  },
  equation: {
    label: "方程组",
    range: "上篇 02:11:48–02:42:29 · 下篇 05:00:58–06:25:23",
    url: "https://www.bilibili.com/video/BV1shzdYqEXq/?t=18058"
  },
  eigen: {
    label: "特征",
    range: "上篇 02:53:00–03:25:01 · 下篇 06:25:23–06:57:01",
    url: "https://www.bilibili.com/video/BV1shzdYqEXq/?t=23123"
  }
};

export const chapters = [
  { id: "overview", short: "总", index: "00", title: "全局大观", subtitle: "把六章翻译成同一套语言", color: "#5368ed" },
  { id: "determinant", short: "行", index: "01", title: "行列式", subtitle: "一个数：先找结构，再决定算法", color: "#3269d7" },
  { id: "matrix", short: "矩", index: "02", title: "矩阵", subtitle: "计算中枢：可逆、秩、伴随与方程", color: "#0f8da8" },
  { id: "vector", short: "向", index: "03", title: "向量", subtitle: "空间语言：表示、相关、秩与基", color: "#0d9a77" },
  { id: "equation", short: "方", index: "04", title: "方程组", subtitle: "把解的个数、结构和关系一次看透", color: "#d27b35" },
  { id: "eigen", short: "特", index: "05", title: "特征理论", subtitle: "综合终点：相似、对角化与实对称", color: "#dc5c68" }
];

const item = (id, chapter, title, level, summary, config = {}) => ({
  id,
  chapter,
  title,
  level,
  summary,
  core: config.core || "",
  formulas: config.formulas || [],
  triggers: config.triggers || [],
  steps: config.steps || [],
  traps: config.traps || [],
  links: config.links || [],
  memory: config.memory || "",
  tags: config.tags || [],
  source: source[chapter]
});

export const concepts = [
  item("o-language", "overview", "线代不是六座孤岛", "must", "行列式与矩阵负责计算；向量与方程组负责构造空间；特征理论把前面内容综合起来。", {
    core: "做题时不要问“这是第几章”，先问题目正在使用哪一种语言。一个条件常常能在五种语言之间来回翻译。",
    formulas: [
      "|A| = 0 ⇔ A 不可逆 ⇔ r(A) < n",
      "⇔ Ax = 0 有非零解 ⇔ A 的列向量线性相关",
      "⇔ 0 是 A 的特征值"
    ],
    triggers: ["看到方阵且出现唯一解、非零解、可逆、特征值、秩时，立刻启动等价翻译。"],
    steps: ["先定对象是否为 n 阶方阵。", "把题设翻译成秩或可逆性。", "再切换到最容易计算的语言。"],
    traps: ["非方阵不能随意谈行列式、逆矩阵或 n 个特征值。"],
    links: ["m-invertible", "m-rank", "e-homogeneous", "f-basic"],
    memory: "一个核心：秩；两种任务：算与构造；五种语言：行列式、矩阵、向量、方程组、特征。",
    tags: ["总纲", "等价命题", "翻译"]
  }),
  item("o-engine", "overview", "考试发动机：条件 → 结论链", "must", "老师反复使用的不是孤立技巧，而是看到关键词后沿结论链连续推出信息。", {
    core: "题目给出的每一句话都要落到“维数、秩、解空间、特征值”之一。若一句条件没有被使用，通常说明翻译尚未完成。",
    triggers: ["正交 → A⁻¹=Aᵀ", "实对称 → 可正交对角化", "AB=0 → 列空间落入零空间", "A²=A → λ∈{0,1}", "r(A)=1 → 外积结构"],
    steps: ["圈出结构词。", "写出第一层固定结论。", "把第一层结论与题目剩余条件碰撞。", "最后才计算。"],
    traps: ["一上来就展开行列式或列未知数，往往把结构优势全部丢掉。"],
    links: ["m-special", "m-rank-product", "f-symmetric"],
    memory: "先结构，后计算；先翻译，后落笔。",
    tags: ["方法论", "启动信号"]
  }),
  item("o-dimensions", "overview", "尺寸检查是第一道保险", "must", "矩阵相乘、求逆、求行列式、谈相似之前，先在草稿上标尺寸。", {
    core: "许多线代错误不是知识不会，而是把不可乘的矩阵乘了、把列向量当成行向量、或忘了结果尺寸。",
    formulas: ["A<sub>m×n</sub>B<sub>n×p</sub> = C<sub>m×p</sub>", "r(A<sub>m×n</sub>) ≤ min(m,n)"],
    steps: ["在每个矩阵右下角写 m×n。", "中间维相等才可乘。", "结果保留外侧两维。"],
    traps: ["AB 有意义不保证 BA 有意义；即使都有意义，也通常 AB≠BA。"],
    links: ["m-multiply", "m-equations"],
    tags: ["基础", "防错"]
  }),

  item("d-meaning", "determinant", "行列式是矩阵对应的一个数", "must", "行列式不是矩阵；它把一个 n 阶方阵压缩成一个数，用于判断可逆性并参与乘积计算。", {
    core: "先分清“矩阵”和“矩阵的行列式”。矩阵能做初等变换；行列式按相应规则改变数值。",
    formulas: ["A 是矩阵；|A| 或 det(A) 是数", "|A|≠0 ⇔ A 可逆"],
    triggers: ["题目只问行列式值时，优先利用性质而不是求出整个矩阵。"],
    traps: ["A=0 与 |A|=0 完全不同；后者只说明 A 不可逆。"],
    links: ["d-properties", "m-invertible"],
    tags: ["定义", "可逆"]
  }),
  item("d-properties", "determinant", "三类行列变换必须条件反射", "must", "交换、倍乘、倍加对应变号、倍乘、不变；所有行列式计算都建立在这三条上。", {
    formulas: [
      "交换两行（列）：行列式变号",
      "某一行（列）乘 k：行列式乘 k",
      "某一行（列）的 k 倍加到另一行（列）：行列式不变"
    ],
    steps: ["每做一步变换，在等号旁记录符号或倍数。", "目标是造零或造相同行列关系。", "化成三角形后乘主对角线。"],
    traps: ["倍加不变，但直接把一行乘 k 会使行列式也乘 k。", "矩阵初等行变换与行列式变换的记账方式不同。"],
    links: ["d-compute", "m-elementary"],
    memory: "换：负；乘：跟；加：不变。",
    tags: ["性质", "计算"]
  }),
  item("d-compute", "determinant", "计算路线：先看结构，再选展开", "must", "优先顺序是三角结构、造零、拆分与递推；按定义全排列通常只用于理论。", {
    core: "不要看到 n 阶行列式就机械展开。先观察：能否提公因子？是否各行（列）和相同？能否相加减制造大量 0？",
    steps: ["提取公因子与公共结构。", "尝试所有行（列）相加后再分配。", "用倍加造出一行（列）仅剩一个非零元。", "沿零最多的一行（列）展开。", "识别递推、三对角或范德蒙结构。"],
    traps: ["同时做多步变换却不记号，是行列式最常见的失分来源。"],
    links: ["d-properties", "d-expand", "d-split"],
    tags: ["算法", "路线"]
  }),
  item("d-permutation-term", "determinant", "含参行列式：先筛置换项，再算系数", "frequent", "求行列式多项式中 xᵏ 的系数时，不必把整个行列式展开；先锁定能贡献该次数的置换乘积。", {
    core: "老师在下篇补充的做法是：先通过行、列相减消掉不可能的位置，再按“每行每列恰取一个元素”筛出目标项；最后补上排列逆序数决定的正负号。",
    formulas: ["det(A)=Σ<sub>σ∈Sₙ</sub>(−1)<sup>τ(σ)</sup>a<sub>1σ(1)</sub>⋯a<sub>nσ(n)</sub>"],
    steps: ["标出所有含 x 的位置和次数。", "必要时先做保持行列式易追踪的行、列变换。", "按每行每列各取一个元素，筛选总次数恰为 k 的组合。", "计算该置换的逆序数并带符号。", "若有多组组合，将它们的系数相加。"],
    traps: ["只凑出 x 的次数却没有检查是否重复取了同一行或同一列。", "乘积绝对值正确，但漏掉排列符号。"],
    links: ["d-properties", "d-expand"],
    memory: "先筛位置，再乘元素，最后补符号。",
    tags: ["含参行列式", "置换项", "老师补充"]
  }),
  item("d-expand", "determinant", "余子式、代数余子式与拉普拉斯展开", "must", "代数余子式自带位置符号；沿任意一行或一列展开都得到原行列式。", {
    formulas: ["A<sub>ij</sub> = (−1)<sup>i+j</sup>M<sub>ij</sub>", "|A| = Σ<sub>j=1</sub><sup>n</sup>a<sub>ij</sub>A<sub>ij</sub> = Σ<sub>i=1</sub><sup>n</sup>a<sub>ij</sub>A<sub>ij</sub>", "Σ<sub>j</sub>a<sub>ij</sub>A<sub>ij</sub>=|A|", "i≠k 时，Σ<sub>j</sub>a<sub>ij</sub>A<sub>kj</sub>=0"],
    triggers: ["出现 Σa<sub>ij</sub>A<sub>kj</sub> 时，先判断元素与代数余子式是否同一行。"],
    traps: ["M<sub>ij</sub> 不带符号，A<sub>ij</sub> 才带 (−1)<sup>i+j</sup>。"],
    links: ["m-adjoint"],
    tags: ["展开", "代数余子式"]
  }),
  item("d-split", "determinant", "拆行拆列：线性只对一行（列）成立", "frequent", "某一列是两个列向量之和，可把行列式拆成两个；其他列保持完全不变。", {
    formulas: ["det(…, α+β, …)=det(…, α, …)+det(…, β, …)"],
    triggers: ["某列含 a+b、所有列具有相同公共向量、或可拆出单位向量时。"],
    steps: ["只选一行（列）拆。", "每一项保留其余行（列）不变。", "利用重复行（列）为 0 或三角结构快速收尾。"],
    traps: ["det(A+B) 通常不等于 det(A)+det(B)。线性是“固定其余列后对某一列线性”。"],
    links: ["d-compute", "d-e-trick"],
    tags: ["拆分", "抽象题"]
  }),
  item("d-product", "determinant", "乘积、转置、数乘、逆与幂", "must", "抽象行列式题的第一反应是把整体运算直接翻译成标量运算。", {
    formulas: ["|AB|=|A||B|", "|Aᵀ|=|A|", "|kA<sub>n×n</sub>|=k<sup>n</sup>|A|", "|A⁻¹|=1/|A|", "|A<sup>m</sup>|=|A|<sup>m</sup>"],
    traps: ["|kA| 中的 k 要提 n 次，而不是一次。", "|A+B| 没有对应的简单公式。"],
    links: ["m-invertible", "m-adjoint"],
    tags: ["公式", "抽象行列式"]
  }),
  item("d-block", "determinant", "分块三角行列式", "frequent", "分块上三角或下三角时，行列式等于对角块行列式之积。", {
    formulas: ["det [[A,B],[0,D]] = |A||D|", "det [[A,0],[C,D]] = |A||D|"],
    triggers: ["大矩阵出现成片的 0 块时，不要逐元素展开。"],
    traps: ["一般分块矩阵不能直接把块当数字算；需要零块或块之间满足可交换等额外条件。"],
    links: ["m-block"],
    tags: ["分块", "快速计算"]
  }),
  item("d-e-trick", "determinant", "E 的妙用：把抽象条件塞进行列式", "frequent", "遇到 A 的多项式、A±E、伴随或逆矩阵，常用单位矩阵把关系因式分解。", {
    core: "老师在下篇抽象行列式中反复强调：E 既保持矩阵尺寸，又能把标量恒等式搬到矩阵里。",
    formulas: ["A²−E=(A−E)(A+E)", "A<sup>m</sup>−E=(A−E)(A<sup>m−1</sup>+⋯+E)"],
    steps: ["把常数写成对应阶数的 kE。", "尝试因式分解。", "两边取行列式，把矩阵乘法化成数的乘法。"],
    traps: ["矩阵多项式可因式分解，是因为各因子都是同一个 A 的多项式，彼此可交换；任意矩阵不能乱套标量因式分解。"],
    links: ["m-polynomial", "f-polynomial"],
    tags: ["单位矩阵", "抽象题", "老师强调"]
  }),
  item("d-self-opposite", "determinant", "推出目标等于自身相反数，就立刻为零", "frequent", "抽象行列式题中不一定要算出每个元素；若利用转置、正交或乘积性质得到 D=−D，就有 D=0。", {
    core: "下篇用正交矩阵 A 且 |A|&lt;0 的题示范：由 |A|=−1、AᵀA=E，把 E 换成 AᵀA 并提取矩阵因子；再经转置把目标变成它的相反数，从而判零。",
    formulas: ["D=−D ⇒ 2D=0 ⇒ D=0", "AᵀA=E，|A|&lt;0 ⇒ |A|=−1"],
    triggers: ["出现 AᵀA=E、A+Aᵀ、奇数阶反对称结构，或变换后只差一个负号。"],
    steps: ["把 E 改写为题设给出的矩阵乘积。", "提取可公因式化的矩阵。", "用 |AB|=|A||B| 与 |Aᵀ|=|A| 比较目标。", "一旦得到 D=−D，停止继续展开。"],
    traps: ["没有确认负号来自哪里就直接判零；必须把阶数、转置或 |A|=−1 的来源写清。"],
    links: ["d-product", "m-orthogonal"],
    memory: "算不动时，试着证明它等于负的自己。",
    tags: ["判零", "正交矩阵", "老师例题"]
  }),
  item("d-special", "determinant", "特殊结构：三角、对角、反对角与范德蒙", "frequent", "识别结构比展开更重要；结构题的计算量应当非常小。", {
    formulas: ["上/下三角：|A|=∏a<sub>ii</sub>", "反对角：|A|=(−1)<sup>n(n−1)/2</sup>∏a<sub>i,n+1−i</sub>", "范德蒙：∏<sub>i&lt;j</sub>(x<sub>j</sub>−x<sub>i</sub>)"],
    traps: ["范德蒙的正负由列中幂次排列与差的顺序共同决定，不能只背外形。"],
    links: ["d-compute"],
    tags: ["特殊行列式", "结构"]
  }),
  item("d-rank-eigen", "determinant", "行列式是通往秩与特征的门", "must", "行列式为零不是计算终点，而是结构信息：降秩、非零解、线性相关、零特征值同时出现。", {
    formulas: ["|A|=∏λ<sub>i</sub>", "|λE−A|=0 决定特征值"],
    triggers: ["题目给出 |A|=0 后，立即追问能否转成 r(A)&lt;n 或 Ax=0 有非零解。"],
    links: ["o-language", "m-rank", "f-basic"],
    tags: ["综合", "翻译"]
  }),
  item("d-cramer", "determinant", "克拉默法则与方程组判定", "frequent", "当方程个数等于未知量个数时，系数行列式非零可直接保证唯一解，并可用替换列求各分量。", {
    formulas: ["D=|A|≠0 ⇒ xᵢ=Dᵢ/D", "Ax=0 有非零解 ⇔ D=0（n 阶方阵）"],
    triggers: ["n 个方程、n 个未知量，并且题目只问解的存在唯一性或某个分量。"],
    traps: ["D=0 时克拉默法则失效，但方程组可能无解，也可能有无穷多解；必须继续比较秩。"],
    links: ["e-cases", "m-invertible"],
    tags: ["克拉默法则", "方程组"]
  }),

  item("m-basic", "matrix", "矩阵线性运算、乘法与幂", "must", "加减要求同型；数乘作用于每个元素；矩阵幂只对方阵定义，并沿用乘法顺序。", {
    formulas: ["A+B 仅在 A、B 同型时有意义", "A⁰=E", "A<sup>m</sup>A<sup>n</sup>=A<sup>m+n</sup>"],
    traps: ["(A+B)²=A²+AB+BA+B²，只有 AB=BA 时中间项才可写成 2AB。", "矩阵没有通常意义下的除法。"],
    links: ["m-multiply", "m-polynomial"],
    tags: ["基本运算", "矩阵幂"]
  }),
  item("m-multiply", "matrix", "矩阵乘法：行乘列，也是列的线性组合", "must", "AB 的第 j 列等于 A 乘 B 的第 j 列，因此 AB 的每一列都由 A 的列向量线性表示。", {
    formulas: ["(AB)<sub>ij</sub>=Σ<sub>k</sub>a<sub>ik</sub>b<sub>kj</sub>", "C(AB)⊆C(A) ⇒ r(AB)≤r(A)"],
    triggers: ["要证明秩不等式或向量组能线性表示时，用“列的线性组合”解释。"],
    traps: ["矩阵乘法通常不可交换；消去矩阵因子前必须确认可逆。"],
    links: ["m-rank-product", "v-representation"],
    tags: ["乘法", "几何意义"]
  }),
  item("m-transpose", "matrix", "转置、对称与反对称", "must", "转置会反转乘积顺序；任意方阵都可唯一拆成对称部分与反对称部分。", {
    formulas: ["(AB)ᵀ=BᵀAᵀ", "A=(A+Aᵀ)/2+(A−Aᵀ)/2", "Aᵀ=A（对称）", "Aᵀ=−A（反对称）"],
    traps: ["(AB)ᵀ 不是 AᵀBᵀ。", "实反对称矩阵主对角线必为 0。"],
    links: ["f-symmetric", "m-orthogonal"],
    tags: ["转置", "实对称"]
  }),
  item("m-invertible", "matrix", "可逆的完整等价链", "must", "n 阶方阵可逆，可以在行列式、秩、方程组、向量组和特征值之间任意翻译。", {
    formulas: [
      "A 可逆 ⇔ |A|≠0 ⇔ r(A)=n ⇔ A∼E",
      "⇔ Ax=0 只有零解 ⇔ A 的列向量线性无关",
      "⇔ Ax=b 对任意 b 有唯一解 ⇔ A 没有零特征值"
    ],
    triggers: ["出现“唯一”“任意 b”“满秩”“线性无关”任一关键词时。"],
    traps: ["只有方阵才谈可逆；AB=E 时，有限阶方阵中也可推出 BA=E。"],
    links: ["o-language", "e-homogeneous", "f-basic"],
    memory: "非零、满秩、无关、唯一、无零特征值。",
    tags: ["可逆", "等价命题"]
  }),
  item("m-inverse", "matrix", "求逆与矩阵方程", "must", "优先看题目给的是具体矩阵、分块矩阵还是代数关系，再选择初等变换、伴随或整理等式。", {
    formulas: ["A⁻¹=A*/|A|", "(AB)⁻¹=B⁻¹A⁻¹", "(Aᵀ)⁻¹=(A⁻¹)ᵀ", "(kA)⁻¹=(1/k)A⁻¹"],
    steps: ["具体数值矩阵：用 (A|E) → (E|A⁻¹)。", "低阶或已知伴随：用 A*/|A|。", "给出 A 的等式：把含 A 的项整理成 A·B=E 或 B·A=E。"],
    traps: ["(A+B)⁻¹ 没有拆分公式。", "逆矩阵乘到等式两边时注意左右位置。"],
    links: ["m-elementary", "m-equations"],
    tags: ["逆矩阵", "算法"]
  }),
  item("m-adjoint", "matrix", "伴随矩阵：公式少，联动极强", "must", "A* 的核心入口是 AA*=A*A=|A|E；可逆时 A*=|A|A⁻¹。", {
    formulas: ["AA*=A*A=|A|E", "A*=|A|A⁻¹（A 可逆）", "|A*|=|A|<sup>n−1</sup>", "(A*)*=|A|<sup>n−2</sup>A（n≥2）"],
    triggers: ["同时出现伴随、行列式、秩或特征值时，先按 r(A) 分类。"],
    traps: ["A 不可逆时不能写 A*=|A|A⁻¹，但 AA*=|A|E 永远成立。"],
    links: ["m-adjoint-rank", "f-polynomial"],
    tags: ["伴随", "高频"]
  }),
  item("m-adjoint-rank", "matrix", "伴随矩阵的秩三分法", "must", "这是伴随综合题的固定开关：只看 r(A) 与 n 的差距。", {
    formulas: [
      "r(A*)=n，若 r(A)=n",
      "r(A*)=1，若 r(A)=n−1",
      "r(A*)=0，若 r(A)≤n−2"
    ],
    steps: ["先判断 A 是否可逆。", "不可逆时再判断是否恰少一秩。", "据此决定 A* 可逆、秩一或零矩阵。"],
    traps: ["r(A)=n−1 时 A* 不是 0，而是秩 1。"],
    links: ["m-adjoint", "m-rank-one"],
    tags: ["伴随", "秩", "必背"]
  }),
  item("m-elementary", "matrix", "初等变换与初等矩阵", "must", "对 A 做一次初等行变换等于左乘一个初等矩阵；列变换等于右乘。", {
    formulas: ["行变换：PA", "列变换：AQ", "(A|B) 行变换 → (E|A⁻¹B)"],
    steps: ["求秩、解方程组：只用行变换。", "求逆：(A|E) 同步行变换。", "求等价标准形：可同时用行、列变换。"],
    traps: ["解线性方程组时不能随意做列变换，因为列变换改变未知量含义。"],
    links: ["m-rank", "e-cases"],
    tags: ["初等变换", "计算"]
  }),
  item("m-rank", "matrix", "秩：非零子式、阶梯形与空间维数", "must", "秩是最大非零子式的阶数，也是行阶梯形中非零行数，还是列空间维数。", {
    formulas: ["r(A)≤min(m,n)", "r(A)=r(Aᵀ)", "r(PAQ)=r(A)（P,Q 可逆）"],
    triggers: ["具体矩阵求秩用行变换；含参数矩阵要保留导致主元为零的分支。"],
    steps: ["逐列找主元。", "避免除以含参数的式子而不分类。", "数非零行得到秩。"],
    traps: ["矩阵秩不是非零元素个数；行秩=列秩，但最大无关的行组与列组不是同一组对象。"],
    links: ["v-max-independent", "e-cases"],
    tags: ["秩", "核心"]
  }),
  item("m-rank-sum", "matrix", "和、拼接与分块的秩", "frequent", "秩不等式本质上是在比较列空间能装下多少独立方向。", {
    formulas: ["r(A+B)≤r(A)+r(B)", "|r(A)−r(B)|≤r(A+B)", "max{r(A),r(B)}≤r(A,B)≤r(A)+r(B)"],
    traps: ["r(A+B) 通常不等于 r(A)+r(B)。", "横向拼接 (A,B) 要求行数相同。"],
    links: ["m-rank", "v-equivalent"],
    tags: ["秩不等式", "分块"]
  }),
  item("m-rank-product", "matrix", "乘积的秩与 AB=0", "must", "AB 的列来自 A 的列空间，同时 A 左乘会压缩 B 的列空间。", {
    formulas: ["r(AB)≤min{r(A),r(B)}", "r(A)+r(B)−n≤r(AB)", "AB=0 ⇒ r(A)+r(B)≤n"],
    triggers: ["出现 AB=0 时，立即写 C(B)⊆N(A)，再做维数比较。"],
    traps: ["AB=0 不能推出 A=0 或 B=0。", "A、B 的尺寸会影响秩不等式中的中间维数 n。"],
    links: ["e-kernel", "v-space"],
    tags: ["乘积秩", "AB=0"]
  }),
  item("m-rect-product", "matrix", "长方阵夹出的方阵：用尺寸直接判奇异", "frequent", "若 A<sub>m×n</sub>B<sub>n×m</sub> 得到 m 阶方阵且 m&gt;n，则乘积的秩至多为 n，必不满秩，因此行列式为 0。", {
    core: "老师在下篇把它概括为先看尺寸再看秩：不要计算 AB 的元素，沿 r(AB)≤r(B)≤n&lt;m 一步判定。",
    formulas: ["m&gt;n ⇒ r(A<sub>m×n</sub>B<sub>n×m</sub>)≤n&lt;m", "⇒ det(AB)=0"],
    triggers: ["长方阵相乘后得到较大阶方阵；题目只问乘积行列式是否为零。"],
    traps: ["若乘积得到的是较小的 n 阶方阵，不能仅凭 A、B 是长方阵就判零。", "先核对 A、B 的上下标方向与最终方阵阶数。"],
    links: ["o-dimensions", "m-rank-product", "d-rank-eigen"],
    memory: "中间维装不满外侧大方阵，行列式必为零。",
    tags: ["尺寸", "乘积秩", "秒杀"]
  }),
  item("m-rank-ata", "matrix", "r(AᵀA)=r(A) 的实矩阵结论", "must", "实矩阵中 AᵀA 不会额外损失秩，因为 Ax=0 与 AᵀAx=0 的解集完全相同。", {
    formulas: ["r(AᵀA)=r(A)=r(AAᵀ)", "AᵀA=0 ⇒ A=0"],
    core: "由 AᵀAx=0 左乘 xᵀ，得 ‖Ax‖²=0，从而 Ax=0。两者零空间相同，所以秩相同。",
    traps: ["这一证明依赖实数内积；不要把一般的 AB 误当成也保持秩。"],
    links: ["m-rank-product", "v-orthogonal"],
    tags: ["转置乘积", "秩"]
  }),
  item("m-rank-one", "matrix", "秩一矩阵与外积结构", "frequent", "非零秩一矩阵的所有列互成倍数，可写成列向量乘行向量。", {
    formulas: ["r(A)=1 ⇔ A=αβᵀ（α,β 非零）", "tr(αβᵀ)=βᵀα"],
    triggers: ["伴随矩阵秩为 1、所有列成比例、或只剩一个非零特征值时。"],
    traps: ["外积 αβᵀ 是矩阵；内积 βᵀα 是数。"],
    links: ["m-adjoint-rank", "f-rank-one"],
    tags: ["秩一", "外积"]
  }),
  item("m-equations", "matrix", "三类矩阵方程的乘法位置", "must", "解矩阵方程的关键不是背结果，而是逆矩阵应从哪一侧消去。", {
    formulas: ["AX=B ⇒ X=A⁻¹B", "XA=B ⇒ X=BA⁻¹", "AXB=C ⇒ X=A⁻¹CB⁻¹"],
    steps: ["先标尺寸。", "识别 X 左右的系数。", "从相同一侧乘逆矩阵。", "检查乘积顺序。"],
    traps: ["不能把矩阵当分数约掉；左右顺序错了结果通常完全不同。"],
    links: ["m-inverse", "e-matrix-equation"],
    tags: ["矩阵方程", "顺序"]
  }),
  item("m-block", "matrix", "分块矩阵：先检查块尺寸", "frequent", "分块乘法与普通矩阵乘法完全同构，但每个块必须满足可加、可乘的尺寸条件。", {
    formulas: ["diag(A,B)⁻¹=diag(A⁻¹,B⁻¹)", "r(diag(A,B))=r(A)+r(B)"],
    triggers: ["大矩阵出现零块、对角块或重复块时。"],
    traps: ["块不是普通数字；含非零非对角块时，逆矩阵和行列式公式需要额外条件。"],
    links: ["d-block"],
    tags: ["分块矩阵"]
  }),
  item("m-polynomial", "matrix", "矩阵多项式与降幂", "frequent", "若 A 满足低次多项式关系，就把高次幂不断降到低次；求逆也可转成多项式。", {
    formulas: ["若 A²+aA+bE=0 且 b≠0，则 A⁻¹=−(A+aE)/b"],
    steps: ["把常数项写成 kE。", "移项造出 A×某矩阵=E。", "高次幂用递推降阶。"],
    traps: ["只有同一个 A 的多项式彼此可交换。"],
    links: ["d-e-trick", "f-polynomial"],
    tags: ["多项式", "降幂"]
  }),
  item("m-factor-cancel", "matrix", "先提公共因子，再判可逆消去", "frequent", "矩阵等式整理后若两边出现同一个因子，不能像标量那样直接约；先用行列式或特征值证明它可逆，再从正确一侧乘逆。", {
    core: "下篇连续多年真题都沿同一路线：移项 → 提取 A±E、BA 或其他公因子 → 判断公因子行列式非零 → 消去 → 对剩余等式取行列式。",
    formulas: ["PX=PY 且 |P|≠0 ⇒ X=Y", "XP=YP 且 |P|≠0 ⇒ X=Y"],
    steps: ["移项，把同类矩阵乘积放到同一侧。", "按顺序提取左公因子或右公因子。", "计算该因子的行列式，或证明其无零特征值。", "确认可逆后从对应一侧乘逆。", "若最终只求数值，再对简化后的等式取行列式。"],
    traps: ["矩阵不可交换，AX+BX 一般不能提成 (A+B)X 以外的顺序。", "没有证明因子可逆就约去，会丢失解。"],
    links: ["m-invertible", "m-equations", "d-e-trick"],
    memory: "提得出来不等于约得掉；可逆才有消去权。",
    tags: ["因式分解", "消去", "历年题套路"]
  }),
  item("m-orthogonal", "matrix", "正交矩阵：逆等于转置", "must", "正交矩阵保持长度与夹角；其行、列向量分别构成标准正交组。", {
    formulas: ["AᵀA=AAᵀ=E ⇔ A⁻¹=Aᵀ", "|A|=±1", "λ 为实特征值 ⇒ λ=±1"],
    triggers: ["出现 AᵀA=E、列向量单位正交、保长度或保内积。"],
    traps: ["正交矩阵的复特征值模为 1，但不一定全是 ±1；只有实特征值才是 ±1。"],
    links: ["v-orthogonal", "f-symmetric"],
    tags: ["正交矩阵", "几何"]
  }),
  item("m-special", "matrix", "幂等、幂零与对合矩阵", "advanced", "特殊方程直接限制特征值；这类题先代入 Ax=λx，再考虑是否可对角化。", {
    formulas: ["A²=A ⇒ λ∈{0,1}，且 A 可对角化", "A<sup>k</sup>=0 ⇒ λ=0", "A²=E ⇒ λ∈{−1,1}，且 A 可对角化"],
    triggers: ["看到 A 的低次幂等式。"],
    traps: ["所有特征值为 0 不推出 A=0；幂零非零矩阵就是反例。"],
    links: ["f-diagonalizable", "f-basic"],
    tags: ["特殊矩阵", "综合"]
  }),
  item("m-relations", "matrix", "等价、相似、合同不要混", "must", "三种关系保留的信息不同：等价保秩，相似保线性变换的特征结构，合同服务于二次型。", {
    formulas: ["等价：B=PAQ（P,Q 可逆）", "相似：B=P⁻¹AP", "合同：B=PᵀAP"],
    triggers: ["问不变量时先确定是哪一种关系。"],
    traps: ["相似一定等价；等价不一定相似。实对称矩阵合同不必相似。"],
    links: ["f-similar", "f-symmetric"],
    tags: ["等价", "相似", "合同"]
  }),
  item("m-equivalent-form", "matrix", "矩阵等价标准形", "frequent", "任何秩为 r 的 m×n 矩阵都可通过初等行、列变换化为只有左上角 r 阶单位块非零的标准形。", {
    formulas: ["A ≃ [[E<sub>r</sub>,0],[0,0]]"],
    triggers: ["只比较两个矩阵是否等价时，最终只需比较秩。"],
    traps: ["等价允许左右乘两个不同的可逆矩阵；它比相似、合同更宽松。"],
    links: ["m-rank", "m-relations"],
    tags: ["等价标准形", "秩"]
  }),
  item("m-trace", "matrix", "迹：对角线之和，也是特征值之和", "frequent", "迹对加法线性，并允许循环交换乘积，是参数题和秩一矩阵题的快速入口。", {
    formulas: ["tr(A+B)=tr(A)+tr(B)", "tr(kA)=k·tr(A)", "tr(AB)=tr(BA)", "tr(P⁻¹AP)=tr(A)"],
    traps: ["tr(ABC) 可循环成 tr(BCA)，但不能任意交换成 tr(ACB)。"],
    links: ["f-invariants", "m-rank-one"],
    tags: ["迹", "不变量"]
  }),
  item("m-positive", "matrix", "正定性的矩阵入口", "frequent", "正定首先要求实对称；判断可走二次型、特征值或顺序主子式。", {
    formulas: ["xᵀAx>0（∀x≠0）", "A 正定 ⇔ 全部特征值&gt;0", "⇔ 各阶顺序主子式&gt;0"],
    triggers: ["出现 xᵀAx、顺序主子式、实对称或特征值符号。"],
    traps: ["“所有主对角元大于 0”不够；顺序主子式指左上角 1 阶到 n 阶。"],
    links: ["f-symmetric"],
    tags: ["正定", "二次型接口"]
  }),

  item("v-representation", "vector", "线性表示就是解方程组", "must", "β 能否由 α₁,…,αₘ 线性表示，等价于 Ax=β 是否有解。", {
    formulas: ["β=k₁α₁+⋯+kₘαₘ ⇔ Ax=β", "可表示 ⇔ r(A)=r(A,β)"],
    steps: ["把生成向量按列排成 A。", "把系数作为未知量 x。", "判断增广矩阵秩。"],
    traps: ["向量默认按列组成矩阵；排成行后方程形式会改变。"],
    links: ["e-cases", "v-equivalent"],
    tags: ["线性表示", "方程组"]
  }),
  item("v-unique", "vector", "线性表示何时唯一", "frequent", "β 能由向量组表示且表示系数唯一，等价于 Ax=β 有唯一解；因此生成向量组必须线性无关。", {
    formulas: ["表示存在 ⇔ r(A)=r(A,β)", "表示唯一 ⇔ r(A)=r(A,β)=列数 m"],
    traps: ["向量组相关时，只要 β 可表示，其表示通常不唯一；不要把“可表示”与“唯一表示”混为一谈。"],
    links: ["v-representation", "e-cases"],
    tags: ["唯一表示", "秩"]
  }),
  item("v-dependent", "vector", "线性相关的四种翻译", "must", "向量组相关意味着存在不全为零的系数组合为零，也意味着列矩阵降秩。", {
    formulas: ["α₁,…,αₘ 相关 ⇔ Ax=0 有非零解", "⇔ r(A)&lt;m", "⇔ 至少一个向量可由其余向量表示"],
    triggers: ["向量个数 m 大于所在空间维数 n 时必相关。"],
    traps: ["含零向量的向量组必相关；单个非零向量线性无关。"],
    links: ["m-rank", "e-homogeneous"],
    tags: ["线性相关", "等价命题"]
  }),
  item("v-theorems", "vector", "部分组、延长组与表示定理", "must", "判断相关性的题常靠方向正确的定理，而不是硬列方程。", {
    formulas: ["部分组相关 ⇒ 整组相关", "整组无关 ⇒ 任一部分组无关", "无关组接入一个可由其表示的向量 ⇒ 新组相关"],
    traps: ["整组相关不能推出任一部分组都相关；部分组无关也不能推出整组无关。"],
    links: ["v-dependent", "v-max-independent"],
    tags: ["定理", "判断"]
  }),
  item("v-max-independent", "vector", "最大无关组与向量组的秩", "must", "最大无关组不是唯一的，但所含向量个数唯一，这个数就是向量组的秩。", {
    formulas: ["r(α₁,…,αₘ)=最大无关组所含向量个数"],
    steps: ["把向量按列组成矩阵。", "行化简找主元列。", "回到原矩阵取对应列，不能取化简后的列。"],
    traps: ["化简后的主元列位置用来选原向量；化简会改变列向量本身。"],
    links: ["m-rank", "v-basis"],
    tags: ["最大无关组", "秩"]
  }),
  item("v-equivalent", "vector", "等价向量组与秩的比较", "frequent", "两组向量能互相线性表示即等价；它们张成同一空间并具有相同的秩。", {
    formulas: ["β 组可由 α 组表示 ⇒ r(β)≤r(α)", "互相表示 ⇔ 两组等价 ⇒ 秩相等"],
    traps: ["秩相等不能单独推出两组等价；还要保证它们张成的空间相同。"],
    links: ["v-representation", "v-space"],
    tags: ["等价向量组", "秩"]
  }),
  item("v-space", "vector", "子空间、生成空间与维数", "frequent", "空间题把“向量集合”升级为“所有线性组合的集合”；基是最精简且不冗余的生成组。", {
    formulas: ["span{α₁,…,αₘ}=C(A)", "dim C(A)=r(A)", "dim N(A)=n−r(A)"],
    triggers: ["出现所有解、张成空间、列空间、零空间。"],
    traps: ["子空间必须包含零向量，并对加法与数乘封闭。"],
    links: ["v-basis", "e-kernel"],
    tags: ["向量空间", "维数"]
  }),
  item("v-basis", "vector", "基、坐标与过渡矩阵", "frequent", "基负责描述空间，坐标负责描述向量；同一个向量换基后坐标会改变。", {
    formulas: ["(β₁,…,βₙ)=(α₁,…,αₙ)P", "[x]<sub>α</sub>=P[x]<sub>β</sub>"],
    steps: ["先明确 P 的列是哪组基在另一组基下的坐标。", "写出基矩阵等式。", "再由同一向量的两种表示推出坐标关系。"],
    traps: ["过渡矩阵方向反了，坐标变换就会取错逆。"],
    links: ["m-relations"],
    tags: ["基", "坐标", "过渡矩阵"]
  }),
  item("v-orthogonal", "vector", "正交、单位化与施密特", "must", "正交向量组只要都非零就线性无关；施密特把无关组变成标准正交组。", {
    formulas: ["β₁=α₁", "β₂=α₂−(α₂,β₁)/(β₁,β₁)·β₁", "eᵢ=βᵢ/‖βᵢ‖"],
    steps: ["按顺序减去在已有正交向量上的投影。", "每得到一个 βᵢ 就检查与前面内积为 0。", "最后统一单位化。"],
    traps: ["正交化与单位化是两步；施密特过程中顺序不同会得到不同的正交基。"],
    links: ["m-orthogonal", "f-symmetric"],
    tags: ["正交", "施密特"]
  }),

  item("e-homogeneous", "equation", "齐次方程组：只看 n−r(A)", "must", "Ax=0 一定有零解；是否有非零解、基础解系含几个向量，都由秩决定。", {
    formulas: ["Ax=0 有非零解 ⇔ r(A)&lt;n", "基础解系含 n−r(A) 个线性无关解向量"],
    steps: ["行化简求 r(A)。", "确定自由变量个数 n−r(A)。", "每次令一个自由变量为 1、其余为 0，构造基础解系。"],
    traps: ["m 个方程、n 个未知量时，解空间维数用 n−r(A)，不是 m−r(A)。"],
    links: ["v-dependent", "e-kernel"],
    tags: ["齐次方程", "基础解系"]
  }),
  item("e-cases", "equation", "非齐次方程组的三种解况", "must", "比较系数矩阵与增广矩阵的秩：不等则无解，相等则有解，再与未知量数 n 比较。", {
    formulas: ["r(A)&lt;r(A,b) ⇒ 无解", "r(A)=r(A,b)=n ⇒ 唯一解", "r(A)=r(A,b)&lt;n ⇒ 无穷多解"],
    steps: ["只对增广矩阵做行变换。", "分别读出 r(A) 与 r(A,b)。", "再与未知量个数 n 比较。"],
    traps: ["不是与方程个数比较；唯一解的条件是秩等于未知量数。"],
    links: ["m-rank", "v-representation"],
    tags: ["非齐次方程", "解况"]
  }),
  item("e-structure", "equation", "解的结构：特解 + 齐次通解", "must", "非齐次方程所有解构成一个平移后的齐次解空间。", {
    formulas: ["Ax=b 的通解：x=η*+k₁ξ₁+⋯+k<sub>n−r</sub>ξ<sub>n−r</sub>", "Aη₁=b, Aη₂=b ⇒ A(η₁−η₂)=0", "齐次解 + 非齐次解 = 非齐次解"],
    triggers: ["已知两个非齐次解时，它们的差一定是齐次解。"],
    traps: ["两个非齐次解相加一般不是原方程的解，而是 A(η₁+η₂)=2b。"],
    links: ["e-relations", "e-homogeneous"],
    tags: ["通解", "解的结构"]
  }),
  item("e-relations", "equation", "解向量做线性组合时先看右端", "must", "判断若干解的组合仍属于哪个方程，只需把组合代入 A 并利用线性。", {
    formulas: ["若 Aηᵢ=b，则 A(Σkᵢηᵢ)=(Σkᵢ)b"],
    triggers: ["系数和为 1 ⇒ 仍是 Ax=b 的解；系数和为 0 ⇒ 是 Ax=0 的解。"],
    traps: ["不要凭“解的线性组合仍是解”乱选；非齐次解集不是线性空间。"],
    links: ["e-structure"],
    tags: ["解的关系", "高频"]
  }),
  item("e-kernel", "equation", "两个齐次方程组的解集包含", "frequent", "Ax=0 的每个解也是 Bx=0 的解，意味着 N(A)⊆N(B)，也可翻译为 B 的行向量能由 A 的行向量表示。", {
    formulas: ["N(A)⊆N(B) ⇔ R(Bᵀ)⊆R(Aᵀ) ⇔ B=CA（适配尺寸）"],
    traps: ["解集包含方向与行空间包含方向相反，最容易写反。"],
    links: ["m-multiply", "v-equivalent"],
    tags: ["解集包含", "行空间"]
  }),
  item("e-common", "equation", "公共解与联立方程组", "frequent", "同时满足 Ax=0 与 Bx=0，就把两组方程纵向拼接。", {
    formulas: ["公共解：[[A],[B]]x=0", "公共解空间维数 = n−r([[A],[B]])"],
    traps: ["求公共解是纵向拼接系数矩阵，不是横向拼接。"],
    links: ["m-rank-sum", "e-homogeneous"],
    tags: ["公共解", "拼接"]
  }),
  item("e-inverse-problem", "equation", "已知解反求系数或参数", "frequent", "把每个已知解直接代入；多个非齐次解先做差，快速制造齐次解。", {
    steps: ["先将已知非齐次解相减，得到齐次解方向。", "利用解空间维数推秩。", "再代入一个特解确定右端或剩余参数。"],
    traps: ["只代入不利用“解的个数/线性无关性”，会漏掉最关键的秩条件。"],
    links: ["e-structure", "m-rank"],
    tags: ["反问题", "参数"]
  }),
  item("e-parameter", "equation", "含参数方程组必须在主元处分类", "must", "分类点来自可能为零的主元、矛盾行或系数矩阵与增广矩阵秩的变化。", {
    steps: ["行变换时避免除以含参数表达式。", "把关键因子保留下来。", "按关键因子为 0 / 非 0 分类。", "每一类分别比较秩。"],
    traps: ["未经讨论就除以 a−1，会直接丢掉最重要的一类解。"],
    links: ["e-cases", "m-rank"],
    tags: ["参数", "分类讨论"]
  }),
  item("e-matrix-equation", "equation", "AX=0 的列视角", "frequent", "矩阵 X 满足 AX=0，等价于 X 的每一列都是 Ax=0 的解。", {
    formulas: ["AX=0 ⇔ C(X)⊆N(A)", "⇒ r(X)≤n−r(A)"],
    triggers: ["题目把未知量从向量换成矩阵时。"],
    traps: ["AX=0 不是只有一个向量方程，而是一组共享系数矩阵的齐次方程。"],
    links: ["m-rank-product", "e-kernel"],
    tags: ["矩阵方程", "解空间"]
  }),

  item("f-basic", "eigen", "特征值与特征向量的入口", "must", "Ax=λx 要求 x≠0；把它移项后得到齐次方程，非零解条件给出特征方程。", {
    formulas: ["(λE−A)x=0", "|λE−A|=0"],
    steps: ["求特征多项式。", "解出 λ。", "对每个 λ 求 (λE−A)x=0 的基础解系。"],
    traps: ["零向量永远不是特征向量；特征向量必须注明对应哪个特征值。"],
    links: ["d-rank-eigen", "e-homogeneous"],
    tags: ["定义", "特征方程"]
  }),
  item("f-invariants", "eigen", "迹、行列式、秩与特征值", "must", "特征值的和看迹，积看行列式，零特征值的出现看是否可逆。", {
    formulas: ["Σλᵢ=tr(A)", "∏λᵢ=|A|", "0 是特征值 ⇔ r(A)&lt;n"],
    triggers: ["只要求参数、特征值之和或之积时，不必展开求全部特征值。"],
    traps: ["秩通常不等于非零特征值的个数；可对角化时才可直接这样数（按代数重数）。"],
    links: ["m-invertible", "f-diagonalizable"],
    tags: ["迹", "行列式", "不变量"]
  }),
  item("f-polynomial", "eigen", "A 的多项式如何变特征值", "must", "若 Ax=λx，则同一个特征向量 x 对 p(A) 的特征值是 p(λ)。", {
    formulas: ["A<sup>k</sup>x=λ<sup>k</sup>x", "p(A)x=p(λ)x", "A⁻¹ 的特征值为 1/λ", "A* 的特征值为 |A|/λ（A 可逆）"],
    triggers: ["求 A²+aA+bE、A⁻¹、A* 的特征值。"],
    traps: ["知道 p(A) 的特征值未必能唯一反推出 A 的特征值；p 可能多对一。"],
    links: ["m-polynomial", "m-adjoint"],
    tags: ["多项式", "伴随"]
  }),
  item("f-independent", "eigen", "不同特征值的特征向量必无关", "must", "这是构造 P 与判断可对角化的基础。", {
    formulas: ["λ₁,…,λₖ 两两不同 ⇒ 对应非零特征向量 x₁,…,xₖ 线性无关"],
    traps: ["同一特征值对应的任意特征向量不自动无关，要从该特征子空间中选基础解系。"],
    links: ["f-diagonalizable", "f-multiplicity"],
    tags: ["线性无关", "定理"]
  }),
  item("f-multiplicity", "eigen", "代数重数与几何重数", "must", "某特征值 λ 的几何重数是特征子空间维数 n−r(λE−A)，且不超过代数重数。", {
    formulas: ["g(λ)=dim N(λE−A)=n−r(λE−A)≤a(λ)"],
    triggers: ["出现重根或问能否对角化时，必须求特征向量个数。"],
    traps: ["特征值有 n 个（计重数）不等于一定有 n 个无关特征向量。"],
    links: ["f-diagonalizable", "e-homogeneous"],
    tags: ["重数", "特征子空间"]
  }),
  item("f-similar", "eigen", "相似矩阵保留什么", "must", "相似矩阵代表同一线性变换在不同基下的矩阵，因而特征结构和所有多项式不变量一致。", {
    formulas: ["B=P⁻¹AP", "|λE−A|=|λE−B|", "tr(A)=tr(B)", "|A|=|B|", "r(A)=r(B)"],
    traps: ["特征值相同不一定相似；还需要特征子空间/Jordan 结构一致。", "AB 与 BA 同阶时特征多项式相同，但不要无条件说它们相似。"],
    links: ["m-relations", "f-diagonalizable"],
    tags: ["相似", "不变量"]
  }),
  item("f-diagonalizable", "eigen", "可对角化的判定总表", "must", "核心条件是凑齐 n 个线性无关特征向量。", {
    formulas: ["A 可对角化 ⇔ 存在 n 个无关特征向量", "⇔ 对每个 λ，几何重数=代数重数"],
    triggers: ["n 个互异特征值 ⇒ 一定可对角化；实对称矩阵 ⇒ 一定可正交对角化。"],
    steps: ["先求特征值及代数重数。", "只对重根检查 n−r(λE−A)。", "所有特征子空间维数之和为 n 即可。"],
    traps: ["有重特征值不等于不能对角化；关键看对应无关特征向量是否够。"],
    links: ["f-multiplicity", "f-symmetric"],
    tags: ["对角化", "判定"]
  }),
  item("f-diagonalize", "eigen", "求 P 与 Λ：列顺序必须配对", "must", "P 的列是特征向量；Λ 的对角元按完全相同的顺序放对应特征值。", {
    formulas: ["P⁻¹AP=Λ ⇔ AP=PΛ ⇔ A=PΛP⁻¹"],
    steps: ["依次选出 n 个无关特征向量。", "按选取顺序组成 P。", "按相同顺序写 Λ。", "用 AP=PΛ 快速验算。"],
    traps: ["更换 P 的列顺序后必须同步更换 Λ；特征向量可倍乘，所以 P 不唯一。"],
    links: ["f-independent", "f-symmetric"],
    tags: ["求P", "对角化"]
  }),
  item("f-symmetric", "eigen", "实对称矩阵的四条王牌性质", "must", "实对称矩阵的特征值全为实数；不同特征值的特征向量正交；必可正交对角化。", {
    formulas: ["Aᵀ=A ⇒ ∃正交 Q，使 QᵀAQ=Λ", "不同 λ 对应的特征向量正交"],
    steps: ["求全部特征值。", "分别求特征子空间。", "同一重特征值内做施密特正交化。", "全部单位化后按列组成 Q。"],
    traps: ["同一特征值对应的特征向量不自动正交，需要在其特征子空间内正交化。"],
    links: ["v-orthogonal", "m-positive"],
    tags: ["实对称", "正交对角化"]
  }),
  item("f-rank-one", "eigen", "秩一矩阵的特征结构", "frequent", "秩一矩阵最多只有一个非零特征值；若可对角化，该非零特征值就是迹。", {
    formulas: ["A=αβᵀ ⇒ Aα=(βᵀα)α", "非零特征值候选 βᵀα=tr(A)"],
    triggers: ["A=αβᵀ、r(A)=1 或伴随矩阵秩为 1。"],
    traps: ["当 tr(A)=0 时，秩一非零矩阵可能只有零特征值且不可对角化。"],
    links: ["m-rank-one", "m-adjoint-rank"],
    tags: ["秩一", "特征值"]
  }),
  item("f-transpose", "eigen", "A 与 Aᵀ、AB 与 BA", "frequent", "A 与 Aᵀ 特征多项式相同；AB 与 BA 的非零特征值相同，方阵同阶时特征多项式相同。", {
    formulas: ["|λE−Aᵀ|=|λE−A|", "det(λE−AB)=det(λE−BA)（同阶）"],
    traps: ["特征值相同不能直接推出相似；A 与 Aᵀ 确实总相似，但考试证明通常不靠“特征值相同”。"],
    links: ["f-similar"],
    tags: ["转置", "AB与BA"]
  }),
  item("f-reconstruct", "eigen", "由特征数据反求矩阵", "frequent", "知道足够多的线性无关特征向量及对应特征值，就可用 A=PΛP⁻¹ 重构。", {
    formulas: ["A=PΛP⁻¹", "实对称且 Q 正交时 A=QΛQᵀ"],
    steps: ["把特征向量按列组成 P 或 Q。", "按列顺序放 Λ。", "优先使用 AP=PΛ 或 A=QΛQᵀ，减少求逆。"],
    traps: ["特征向量数量不足时，矩阵通常不能唯一确定。"],
    links: ["f-diagonalize", "f-symmetric"],
    tags: ["反求矩阵", "综合"]
  }),
  item("f-positive", "eigen", "特征值符号连接正定与惯性", "frequent", "实对称矩阵中，正负零特征值的个数决定二次型的正负惯性指数与秩。", {
    formulas: ["r(A)=非零特征值个数（实对称，计重数）", "正定 ⇔ 全部 λᵢ&gt;0", "半正定 ⇔ 全部 λᵢ≥0"],
    traps: ["“非零特征值个数=秩”对一般不可对角化矩阵不能随意使用。"],
    links: ["m-positive", "f-symmetric"],
    tags: ["正定", "惯性"]
  }),
  item("f-cayley", "eigen", "凯莱–哈密顿：矩阵满足自己的特征方程", "advanced", "把特征多项式中的 λ 换成 A，可得到零矩阵；它能把高次幂降阶并在常数项非零时求逆。", {
    formulas: ["p(λ)=|λE−A| ⇒ p(A)=0"],
    steps: ["先求特征多项式。", "写出 p(A)=0。", "用它把 A 的高次幂降到 n−1 次以内。"],
    traps: ["p(A)=0 指零矩阵；代入时常数项必须写成常数乘 E。"],
    links: ["m-polynomial", "f-polynomial"],
    tags: ["凯莱哈密顿", "降幂"]
  })
];

export const timeline = [
  { time: "上篇 00:00", title: "总览与使用方式", chapter: "overview" },
  { time: "上篇 08:32", title: "行列式知识点", chapter: "determinant" },
  { time: "上篇 23:01", title: "行列式题目", chapter: "determinant" },
  { time: "上篇 01:09:36", title: "矩阵知识点与题型", chapter: "matrix" },
  { time: "上篇 02:11:48", title: "方程组知识点", chapter: "equation" },
  { time: "上篇 02:42:29", title: "向量知识点", chapter: "vector" },
  { time: "上篇 02:53:00", title: "特征知识点", chapter: "eigen" },
  { time: "下篇 03:54", title: "行列式题型串联", chapter: "determinant" },
  { time: "下篇 00:12:14", title: "抽象行列式中 E 的妙用", chapter: "determinant" },
  { time: "下篇 00:32:07", title: "伴随矩阵特征值联动", chapter: "determinant" },
  { time: "下篇 00:45:45", title: "拆列与分配律", chapter: "determinant" },
  { time: "下篇 01:04:36", title: "矩阵综合题", chapter: "matrix" },
  { time: "下篇 02:10:35", title: "矩阵、秩与方程综合", chapter: "matrix" },
  { time: "下篇 03:34:00", title: "正定判断综合", chapter: "matrix" },
  { time: "下篇 03:54:32", title: "向量综合题", chapter: "vector" },
  { time: "下篇 05:00:58", title: "方程组综合题", chapter: "equation" },
  { time: "下篇 06:02:22", title: "两个方程组的解关系", chapter: "equation" },
  { time: "下篇 06:25:23", title: "特征综合题", chapter: "eigen" }
];

export const examChains = [
  {
    title: "不可逆链",
    signal: "|A|=0 / r(A)<n / Ax=0 有非零解",
    chain: ["行列式为 0", "矩阵不可逆", "列向量相关", "齐次方程有非零解", "0 是特征值"]
  },
  {
    title: "AB=0 链",
    signal: "两个非零矩阵乘积为零",
    chain: ["C(B)⊆N(A)", "r(B)≤n−r(A)", "r(A)+r(B)≤n", "从空间包含继续推"]
  },
  {
    title: "实对称链",
    signal: "Aᵀ=A",
    chain: ["特征值全实", "不同特征值的特征向量正交", "可正交对角化", "用特征值判断正定"]
  },
  {
    title: "伴随链",
    signal: "出现 A*",
    chain: ["先判 r(A)", "满秩：A*=|A|A⁻¹", "差一秩：r(A*)=1", "差两秩及以上：A*=0"]
  }
];

export const levelLabels = {
  must: "必须掌握",
  frequent: "高频题型",
  advanced: "综合拔高"
};
