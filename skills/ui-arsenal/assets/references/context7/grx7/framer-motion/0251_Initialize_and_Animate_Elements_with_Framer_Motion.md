# Initialize and Animate Elements with Framer Motion Projection API

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-transform-parents-animate.html

This JavaScript snippet demonstrates the use of Framer Motion's Projection API to create and animate elements. It initializes projection nodes for existing DOM elements, sets initial transform values, and then dynamically creates a new child element. The code then updates the projection nodes and asserts visual properties like viewport box and opacity after a render cycle, simulating a layout transition.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection
const a = document.getElementById("box-a")
const b = document.getElementById("box-b")
const child = document.querySelector(".child")
const aProjection = createNode(a)
const bProjection = createNode(b)
const childProjection = createNode(child, aProjection, { layoutId: "child", })
aProjection.setValue("x", 100)
bProjection.setValue("x", -100)
frame.postRender(() => {
  aProjection.willUpdate()
  bProjection.willUpdate()
  childProjection.willUpdate()
  const newChild = document.createElement("div")
  newChild.classList.add("child")
  b.appendChild(newChild)
  const newChildProjection = createNode(newChild, bProjection, { layoutId: "child", })
  newChildProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(child, newChild.getBoundingClientRect())
    matchOpacity(child, 1)
    matchOpacity(newChild, 1)
  })
})
```

--------------------------------