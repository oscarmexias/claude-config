# Create Projection Nodes and Synchronize Viewport Boxes

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-scroll-b-a.html

Initializes projection nodes for screen and box elements, creates a scrollable container with a new box element, and synchronizes viewport bounding boxes across different DOM contexts. Uses the Undo, Assert, and Projection APIs to manage layout calculations and element positioning with a 50ms delay for DOM updates.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection

const screen = document.querySelector(".screen")
const screenProjection = createNode(screen)

const box = document.getElementById("box-b")
const boxProjection = createNode(box, screenProjection, {
  layoutId: "box",
})

const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()

const scrollScreen = document.createElement("div")
scrollScreen.classList.add("screen", "scroll")
document.body.appendChild(scrollScreen)

const newBox = document.createElement("div")
newBox.id = "box"
scrollScreen.appendChild(newBox)
scrollScreen.scrollTop = 1000
console.log(scrollScreen.scrollTop)

const scrollScreenProjection = createNode(scrollScreen, undefined)
const newBoxProjection = createNode(
  newBox,
  scrollScreenProjection,
  {
    layoutId: "box",
  }
)

boxProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(newBox, boxOrigin)
  matchViewportBox(box, newBox)
}, 50)
```

--------------------------------