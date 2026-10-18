装环境是为了后面 500+ 课都不用再跟工具打架。自下而上装，上一层坏了先查下一层。

## 四层环境栈

| 层 | 装什么 | 为什么要单独一层 |
| --- | --- | --- |
| 1 系统地基 | OS、shell、git、编辑器、GPU 驱动 | 没有它，上面全是空中楼阁 |
| 2 包管理器 | `uv` / `pnpm` / `cargo` | 管版本、锁依赖、可复现 |
| 3 语言运行时 | Python 3.12、Node 22、Rust | 课用哪门语言，就装哪门 |
| 4 AI 库 | NumPy、PyTorch、transformers | 最后才装；CUDA 对不上就卡在这里 |

分层的理由：每一层只依赖下面那一层。先装 PyTorch 再回头修驱动，等于倒着排错。

## uv 怎么用

`uv` 同时管 Python 版本、虚拟环境和装包，比 pip 快一到两个数量级。

```bash
# 安装 uv 后
uv python install 3.12
uv venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
uv pip install numpy matplotlib jupyter
```

验证：

```python
import sys, numpy as np
print(sys.version)
a = np.array([1, 2, 3])
print(np.dot(a, a))  # 14
```

有 NVIDIA 再装 CUDA 版 PyTorch；Apple Silicon 装默认 wheel，走 MPS，不要加 `--index-url .../cuXXX`。

## 预检怎么用

在课程仓库根目录（有 `README.md` 和 `phases/` 的那一层）跑：

```bash
python3 phases/00-setup-and-tooling/01-dev-environment/code/verify.py --route beginner
```

它只检查你选的路线，缺后面才用的工具默认不报红。常用路线：`beginner`、`ml-foundations`、`llm-engineering`、`agents`、`mcp`、`agent-skills`、`certification`。想顺带看后面的可选工具，加 `--show-later`。

beginner 通过时会打印下一课入口，例如：

```text
Ready to start Beginner course.
Next: python3 phases/01-math-foundations/01-linear-algebra-intuition/code/vectors.py
```

## 最小可跑通路径

Windows 按课程走 WSL2（`wsl --install -d Ubuntu-24.04`），再在 Ubuntu 里装 git / curl / unzip。

1. 系统地基装好（git、curl、编译工具）
2. `uv python install 3.12` + `uv venv` + `uv pip install numpy`
3. `verify.py --route beginner` 全绿
4. 跑 `vectors.py`，能出结果就算 Day1 结束

后面的 Node / Rust / Julia / GPU 等用到那课再装。预检过了就可以开下一课。
