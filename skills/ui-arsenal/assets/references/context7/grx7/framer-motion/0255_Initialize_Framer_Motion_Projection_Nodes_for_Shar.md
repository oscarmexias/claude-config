# Initialize Framer Motion Projection Nodes for Shared Element Transitions in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-shared-deep.html

This JavaScript code initializes a hierarchy of Framer Motion projection nodes for several HTML elements, demonstrating shared element transitions. It uses `window.Animate.createNode` to associate DOM elements with projection logic, establishing parent-child relationships for nested animations. The code then triggers updates and performs a frame check using `window.Assert.checkFrame` to validate the projection system's behavior, particularly regarding node recalculations.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection
const duration = 10
const a = document.getElementById("a")
const aProjection = createNode(
  a,
  undefined,
  { layoutId: "box" },
  { duration }
)
const a2 = document.getElementById("a-2")
const a2Projection = createNode(
  a2,
  aProjection,
  { layoutId: "2" },
  { duration }
)
const a3 = document.getElementById("a-3")
const a3Projection = createNode(
  a3,
  a2Projection,
  { layoutId: "3" },
  { duration }
)
aProjection.willUpdate()
a2Projection.willUpdate()
a3Projection.willUpdate()
const b = document.createElement("div")
b.id = "b"
document.body.appendChild(b)
const bProjection = createNode(
  b,
  undefined,
  { layoutId: "box" },
  { duration }
)
const b2 = document.createElement("div")
b2.id = "b-2"
b.appendChild(b2)
const b2Projection = createNode(
  b2,
  bProjection,
  { layoutId: "2" },
  { duration }
)
const b3 = document.createElement("div")
b3.id = "b-3"
b2.appendChild(b3)
const b3Projection = createNode(
  b3,
  b2Projection,
  { layoutId: "3" },
  { duration }
)
aProjection.root.didUpdate()
/**
 * Shared element transition nodes are currently all recalculated,
 * it would be good to investigate in the future if there's further
 * safe optimisations we can make here.
 */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    console.log(window.ProjectionFrames)
    checkFrame(a, 1, { totalNodes: 7, resolvedTargetDeltas: 3, recalculatedProjection: 6, })
  })
})
```

--------------------------------