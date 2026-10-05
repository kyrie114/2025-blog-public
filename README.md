# kyrie 的个人博客

基于 [YYsuni/2025-blog-public](https://github.com/YYsuni/2025-blog-public) 模板改造。

- 作者展示名：kyrie
- GitHub：[@kyrie114](https://github.com/kyrie114)
- 内容方向：个人分享两条线并列——「AI工程从零」与「矩阵方法跟读」（刘笑嶂《机器学习的矩阵方法》）
- 文风：教学向、干货短打

## 本地预览

```bash
pnpm i
pnpm run dev
```

默认端口：`2025`（见 `package.json` scripts）。

## 配置说明

站点名 / 简介 / 社交链接见 `src/config/site-content.json`。

GitHub 仓库默认 Owner 见 `src/consts.ts`（`GITHUB_CONFIG.OWNER`，可用环境变量 `NEXT_PUBLIC_GITHUB_OWNER` 覆盖）。
