# Create and Animate Projection Nodes with Layout Sharing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-target.html

Creates projection nodes for DOM elements with shared layout IDs, manages animation lifecycle through willUpdate/didUpdate calls, dynamically creates new elements, and validates viewport box positioning after animation completion. Uses Framer Motion's Animate, Assert, and Projection APIs.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection

const a = document.getElementById("box-a")
const childA = document.getElementById("child-a")
const c = document.getElementById("button")

const aProjection = createNode(
  a,
  undefined,
  { layoutId: "box" },
  { duration: 0.1 }
)
const childAProjection = createNode(
  childA,
  aProjection,
  { layoutId: "child" },
  { duration: 0.1 }
)
const cProjection = createNode(
  c,
  undefined,
  { layoutId: "foo" },
  { duration: 0.1 }
)

aProjection.willUpdate()
childAProjection.willUpdate()

const b = document.createElement("div")
const childB = document.createElement("div")
b.id = "box-b"
childB.id = "child-b"
b.appendChild(childB)
document.body.appendChild(b)

const bProjection = createNode(
  b,
  undefined,
  { layoutId: "box" },
  { duration: 0.1 }
)
const childBProjection = createNode(
  childB,
  bProjection,
  { layoutId: "child" },
  { duration: 0.1 }
)

aProjection.root.didUpdate()

setTimeout(() => {
  cProjection.willUpdate()
  c.classList.add("b")
  cProjection.root.didUpdate()
  matchViewportBox(childB, { left: 600, top: 100, height: 50, width: 50 })
}, 200)
```

--------------------------------