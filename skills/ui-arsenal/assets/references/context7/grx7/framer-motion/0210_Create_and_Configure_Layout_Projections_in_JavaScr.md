# Create and Configure Layout Projections in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-scroll-b-a-animate.html

Initializes layout projection nodes for DOM elements using Framer Motion's createNode API. Sets up a parent-child projection hierarchy with layoutId identifiers, then creates a second projection context with a scrollable container to test layout consistency across different viewport configurations.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection

const screen = document.querySelector(".screen")
const screenProjection = createNode(screen)
const box = document.getElementById("box-b")
const boxProjection = createNode(box, screenProjection, {
  layoutId: "box",
})
boxProjection.willUpdate()

const scrollScreen = document.createElement("div")
scrollScreen.classList.add("screen", "scroll")
document.body.appendChild(scrollScreen)
const newBox = document.createElement("div")
newBox.id = "box"
scrollScreen.appendChild(newBox)
scrollScreen.scrollTop = 1000

const scrollScreenProjection = createNode(scrollScreen, undefined)
const newBoxProjection = createNode(
  newBox,
  scrollScreenProjection,
  {
    layoutId: "box",
  }
)
boxProjection.root.didUpdate()
```

--------------------------------