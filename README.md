# Wheeled-WBC 项目主页

纯静态 HTML/CSS/JavaScript 模板，无需 npm 或构建工具。

## 本地预览

在当前论文仓库根目录运行：

```bash
python3 -m http.server 8000 --directory website
```

打开 http://localhost:8000 。也可以直接用浏览器打开 `index.html`。

## 页面内容

- 项目标题、概述与摘要
- DWR / MCE / GMMT 方法介绍
- 论文已有的跨本体实验结果与操作覆盖图
- 遥操作、文本生成动作、长程 VLA 展示区
- 论文、代码、作者和引用信息占位
- 移动端布局、可键盘操作的图片放大对话框

文字及数据来自 `ieeeconf/root.tex`。原有未定稿作者、出版信息未写入页面；视频未提供，因此使用明确的待发布提示。默认不公开当前含模板信息的论文 PDF。

## 发布到 GitHub Pages

目标账号：`Wheeled-WBC`。
目标仓库：`wheeled-wbc.github.io`（账号主页仓库名称使用小写）。
预期地址：https://wheeled-wbc.github.io/ 。这是待部署目标，不代表已经上线。

1. 登录目标 GitHub 账号，新建公开仓库 `wheeled-wbc.github.io`。若仓库已存在，先检查其内容，避免覆盖已有网站。
2. 将本目录内的 `index.html`、`styles.css`、`script.js`、`assets/`、`.nojekyll` 和此 README 放到该仓库根目录；不要再套一层 `website/`。
3. 在 Settings → Pages 中，Source 选择 **Deploy from a branch**，分支选择 **main**，目录选择 **/(root)**，保存。
4. 等待 Pages 部署完成，通过 Settings → Pages 中的链接访问。

GitHub CLI 方式（先在本机完成 `gh auth login`）：

```bash
# 在独立目录解压发布包后执行，避免修改论文仓库的 remote。
git init -b main
git add .
git commit -m "Create Wheeled-WBC project website"
gh repo create Wheeled-WBC/wheeled-wbc.github.io --public --source=. --remote=origin --push
# 若此处首次启用 Pages，可在 GitHub 网页执行上述第 3 步。
```

请勿将账号密码或访问令牌放入网页、Git remote URL 或提交内容。

官方部署说明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 后续编辑

- 内容、作者名单、论文/代码链接：`index.html`
- 颜色、字号、间距、手机布局：`styles.css`
- 图片放大交互：`script.js`
- 图片：`assets/`（WebP 为论文原图的网页压缩版本）
- 演示视频：将 demo 卡片中的待发布提示替换为 `<video controls playsinline preload="metadata">`，并配置实际视频路径。不要自动播放带声音的视频。
- 引用：待作者及出版信息确认后再添加正式 BibTeX。

## 参考与素材

页面结构参考 https://umi-on-legs.github.io/ ，实现代码为本项目新写，未复制其源码或媒体。
论文图片和数据属于 Wheeled-WBC 项目。没有替研究团队设定素材开源许可。
