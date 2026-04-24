import blessed from "neo-blessed"

type Option = {
  label: string
  checked: boolean
}

const screen = blessed.screen({
  smartCSR: true,
  title: "Neo-Blessed Demo",
})

const title = blessed.text({
  parent: screen,
  top: 1,
  left: "center",
  content: "Neo-Blessed Counter Demo",
  style: { bold: true, fg: "cyan" },
})

const progressBar = blessed.progressbar({
  parent: screen,
  top: 4,
  left: "center",
  width: 40,
  height: 3,
  border: { type: "line" },
  style: {
    bar: { bg: "cyan" },
    border: { fg: "cyan" },
  },
  filled: 10,
})

const list = blessed.list({
  parent: screen,
  top: 8,
  left: "center",
  width: 30,
  height: 6,
  border: { type: "line" },
  keys: false,
  mouse: false,
  style: {
    selected: { bg: "cyan", fg: "black" },
    item: { fg: "white" },
  },
})

const hint = blessed.text({
  parent: screen,
  bottom: 1,
  left: "center",
  content: "Up/Down select | Space toggle | Left/Right progress | q quit",
  style: { dim: true },
})

const options: Option[] = [
  { label: "Option A", checked: true },
  { label: "Option B", checked: false },
  { label: "Option C", checked: true },
  { label: "Option D", checked: false },
]

let selectedIndex = 0
let progress = 10

function renderList(): void {
  list.setItems(
    options.map((option) => `[${option.checked ? "x" : " "}] ${option.label}`),
  )
  list.select(selectedIndex)
}

function renderProgress(): void {
  progressBar.setProgress(progress)
}

function renderScreen(): void {
  renderList()
  renderProgress()
  screen.render()
}

screen.key(["escape", "q", "C-c"], () => {
  screen.destroy()
  process.exit(0)
})

screen.key(["up"], () => {
  selectedIndex = Math.max(0, selectedIndex - 1)
  renderScreen()
})

screen.key(["down"], () => {
  selectedIndex = Math.min(options.length - 1, selectedIndex + 1)
  renderScreen()
})

screen.key(["space"], () => {
  const current = options[selectedIndex]
  current.checked = !current.checked
  renderScreen()
})

screen.key(["right"], () => {
  progress = Math.min(20, progress + 1)
  renderScreen()
})

screen.key(["left"], () => {
  progress = Math.max(0, progress - 1)
  renderScreen()
})

renderScreen()
