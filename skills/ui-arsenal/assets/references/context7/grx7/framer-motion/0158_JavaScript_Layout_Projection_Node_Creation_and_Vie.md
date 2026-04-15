# JavaScript Layout Projection Node Creation and Viewport Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-scroll-a-b.html

Creates projection nodes for scrollable and fixed containers using Framer Motion's projection system, then validates that viewport boxes match correctly across different layout contexts. Uses setTimeout to allow DOM updates before performing viewport box assertions.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection

const scrollScreen = document.querySelector(".screen")
const scrollScreenProjection = createNode(scrollScreen, undefined, {
  layoutScroll: true,
})
scrollScreen.scrollTop = 1000

const box = document.getElementById("box")
const boxProjection = createNode(box, scrollScreenProjection, {
  layoutId: "box",
})
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()

const screen = document.createElement("div")
screen.classList.add("screen")
document.body.appendChild(screen)
const screenProjection = createNode(screen, undefined)

const newBox = document.createElement("div")
newBox.id = "box-b"
screen.appendChild(newBox)
const newBoxProjection = createNode(newBox, screenProjection, {
  layoutId: "box",
})

boxProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(newBox, boxOrigin)
  matchViewportBox(box, newBox)
}, 50)
```

--------------------------------