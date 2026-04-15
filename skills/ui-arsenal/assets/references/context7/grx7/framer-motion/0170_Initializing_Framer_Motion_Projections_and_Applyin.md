# Initializing Framer Motion Projections and Applying Layout Changes with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-parent-child-static-grandchild.html

This JavaScript code initializes Framer Motion projection nodes for 'parent', 'child', and 'grandChild' elements, establishing a hierarchy. It then applies a class 'b' to the parent element, triggering a layout change, and uses `requestAnimationFrame` to assert the state of the projection frames after the update. It depends on global `Animate`, `Assert`, and `Projection` objects.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const parentProjection = createNode(
  parent,
  undefined,
  {},
  { duration: 0.1 }
)
const child = document.getElementById("child")
const childProjection = createNode(
  child,
  parentProjection,
  {},
  { duration: 0.1 }
)
const grandChild = document.getElementById("grandChild")
const grandChildProjection = createNode(
  grandChild,
  childProjection,
  {},
  { duration: 0.1 }
)
parentProjection.willUpdate()
childProjection.willUpdate()
grandChildProjection.willUpdate()
parent.classList.add("b")
parentProjection.root.didUpdate()
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    console.log(window.ProjectionFrames)
    checkFrame(parent, 1, {
      totalNodes: 4,
      resolvedTargetDeltas: 3,
      recalculatedProjection: 3,
    })
  })
})
```

--------------------------------