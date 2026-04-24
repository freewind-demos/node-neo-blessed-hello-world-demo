import blessed from "neo-blessed"

const screen = blessed.screen({
  smartCSR: true,
  title: "Neo-Blessed Demo",
})

// 标题
const title = blessed.text({
  parent: screen,
  top: 1,
  left: "center",
  content: "🎮 Neo-Blessed Counter Demo",
  style: { bold: true, fg: "cyan" },
})

// 进度条
const progressBar = blessed.progressbar({
  parent: screen,
  top: 4,
  left: "center",
  width: 40,
  height: 1,
  border: { type: "line" },
  style: {
    bar: { bg: "cyan" },
    border: { fg: "cyan" },
  },
  min: 0,
  max: 20,
  filled: 10,
  showLabel: true,
  label: "Progress",
})

// 复选框列表
const list = blessed.list({
  parent: screen,
  top: 7,
  left: "center",
  width: 30,
  height: 6,
  border: { type: "line" },
  style: {
    selected: { bg: "cyan", fg: "black" },
    item: { fg: "white" },
  },
  items: ["[x] Option A", "[ ] Option B", "[x] Option C", "[ ] Option D"],
})

// 底部提示
const hint = blessed.text({
  parent: screen,
  bottom: 1,
  left: "center",
  content: "↑↓ select | space toggle | q quit",
  style: { dim: true },
})

let selectedIndex = 0
let progress = 10

// 键盘事件
screen.key(["escape", "q"], () => process.exit(0))

screen.key(["up"], () => {
  selectedIndex = Math.max(0, selectedIndex - 1)
  list.select(selectedIndex)
  screen.render()
})

screen.key(["down"], () => {
  selectedIndex = Math.min(3, selectedIndex + 1)
  list.select(selectedIndex)
  screen.render()
})

screen.key(["space"], () => {
  const items = list.items
  const current = items[selectedIndex]
  if (current.includes("[x]")) {
    items[selectedIndex] = current.replace("[x]", "[ ]")
  } else {
    items[selectedIndex] = current.replace("[ ]", "[x]")
  }
  list.setItems(items)
  screen.render()
})

screen.key(["right"], () => {
  progress = Math.min(20, progress + 1)
  progressBar.setProgress(progress)
  screen.render()
})

screen.key(["left"], () => {
  progress = Math.max(0, progress - 1)
  progressBar.setProgress(progress)
  screen.render()
})

list.select(0)
screen.render()
