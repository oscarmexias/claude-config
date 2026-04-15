# JavaScript Projection Node Creation and Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-parent-static-child-static-grandchild.skip.html

Creates a hierarchical projection node structure for parent, child, and grandchild DOM elements using Framer Motion's createNode API. Initializes nodes with specific durations, triggers layout updates via willUpdate and didUpdate methods, applies a layout modifier class, and validates frame calculations using requestAnimationFrame callbacks.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection

const parent = document.getElementById("parent")
const parentProjection = createNode(
  parent,
  undefined,
  {},
  { duration: 10 }
)

const child = document.getElementById("child")
const childProjection = createNode(
  child,
  parentProjection,
  {},
  { duration: 0.0001 }
)

const grandChild = document.getElementById("grandChild")
const grandChildProjection = createNode(
  grandChild,
  childProjection,
  {},
  { duration: 0.0001 }
)

parentProjection.willUpdate()
childProjection.willUpdate()
grandChildProjection.willUpdate()

parent.classList.add("b")
parentProjection.root.didUpdate()

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    console.log(window.ProjectionFrames)
    checkFrame(parent, 2, {
      totalNodes: 4,
      resolvedTargetDeltas: 3,
      recalculatedProjection: 3
    })
  })
})
```

--------------------------------