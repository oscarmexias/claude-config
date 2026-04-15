# Test Framer Motion Layout Projection with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-single.html

This JavaScript code utilizes internal Framer Motion APIs to create a projection node for a parent element. It then applies a class 'b' to the parent, triggers layout updates, and uses `requestAnimationFrame` to assert the state of the projection system after the layout change, logging projection frames to the console.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const parentProjection = createNode(
  parent, undefined, {}, { duration: 0.1 }
)
parentProjection.willUpdate()
parent.classList.add("b")
parentProjection.root.didUpdate()
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    console.log(window.ProjectionFrames)
    checkFrame(parent, 1, {
      totalNodes: 2,
      resolvedTargetDeltas: 1,
      recalculatedProjection: 1,
    })
  })
})
```

--------------------------------