# node-neo-blessed-hello-world-demo

## 简介

Neo-Blessed 是 Blessed 的现代重启版，修复了很多遗留 bug，支持更多终端特性。

## 快速开始

### 环境要求

- Node.js >= 14

### 运行

```bash
pnpm install
pnpm start
```

## 概念讲解

Neo-Blessed 的 API 与 Blessed 几乎完全兼容，但底层实现更现代。

### 创建进度条

```javascript
const progressBar = blessed.progressbar({
  parent: screen,
  top: 4,
  left: "center",
  width: 40,
  height: 1,
  border: { type: "line" },
  min: 0,
  max: 20,
  filled: 10,
  showLabel: true,
})
```

### 创建列表

```javascript
const list = blessed.list({
  parent: screen,
  top: 7,
  left: "center",
  width: 30,
  height: 6,
  border: { type: "line" },
  items: ["[x] Option A", "[ ] Option B"],
})
```

### 更新进度条

```javascript
progressBar.setProgress(newValue)
screen.render()
```

## 完整示例

见 `index.js`，演示了：

- 进度条 (ProgressBar)
- 可选择的列表 (List)
- 键盘导航和交互

## 完整讲解

Neo-Blessed 保持了 Blessed 的所有 API，同时修复了大量 bug，增加了对现代终端的支持（如 kitty 键盘协议）。

**进度条**: 用 `setProgress()` 更新数值，需要手动调用 `screen.render()`。

**列表**: 用 `select()` 选中项目，`items` 数组直接修改后用 `setItems()` 更新。

如果现有 Blessed 项目遇到问题，可以尝试换成 neo-blessed，通常能无缝迁移。
