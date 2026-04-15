# Projection Node Hierarchy and Layout Validation in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-neighbours.html

Demonstrates creating a hierarchy of projection nodes and triggering layout updates using internal window-scoped utilities. It validates the resulting frame data to ensure correct node calculations and delta resolutions.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection
const duration = 10
const topEl = document.getElementById("top")
const topProjection = createNode(topEl, undefined, {}, { duration })
const bottom = document.getElementById("bottom")
const bottomProjection = createNode(
  bottom,
  undefined,
  {},
  { duration }
)
const b = document.querySelector(".b")
const bProjection = createNode(
  b,
  bottomProjection,
  {},
  { duration }
)
const c = document.querySelector(".c")
const cProjection = createNode(c, bProjection, {}, { duration })
topProjection.willUpdate()
bottomProjection.willUpdate()
bProjection.willUpdate()
cProjection.willUpdate()
topEl.classList.add("open")
topProjection.root.didUpdate()
frame.postRender(() => {
  frame.postRender(() => {
    console.log(window.ProjectionFrames)
    checkFrame(topEl, 2, {
      totalNodes: 5,
      resolvedTargetDeltas: 3,
      recalculatedProjection: 3,
    })
  })
})
```

--------------------------------