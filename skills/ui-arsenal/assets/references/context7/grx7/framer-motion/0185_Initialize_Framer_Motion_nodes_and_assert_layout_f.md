# Initialize Framer Motion nodes and assert layout frames in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-shared-single.html

This JavaScript snippet initializes two Framer Motion nodes (`aProjection` and `bProjection`) associated with DOM elements 'a' and 'b', respectively. It uses `createNode` to set up layout IDs and animation durations. After updating the root projection, it schedules a check using `requestAnimationFrame` to assert the state of the layout frames, verifying node counts and projection recalculations.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection
const a = document.getElementById("a")
const aProjection = createNode(
  a, undefined, { layoutId: "box" }, { duration: 0.1 }
)
aProjection.willUpdate()
const b = document.createElement("b")
b.id = "b"
document.body.appendChild(b)
const bProjection = createNode(
  b, undefined, { layoutId: "box" }, { duration: 0.1 }
)
aProjection.root.didUpdate()
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    console.log(window.ProjectionFrames)
    checkFrame(a, 1, {
      totalNodes: 3, resolvedTargetDeltas: 1,
      // We only need to resolve a target for the lead node
      recalculatedProjection: 2, // But recalculate a projection for both
    })
  })
})
```

--------------------------------