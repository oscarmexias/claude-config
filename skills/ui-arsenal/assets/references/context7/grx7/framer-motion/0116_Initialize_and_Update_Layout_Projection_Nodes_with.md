# Initialize and Update Layout Projection Nodes with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-static-parent-child-grandchild.skip.html

This JavaScript code initializes projection nodes for `parent`, `child`, and `grandChild` DOM elements using a custom `window.Animate` library, establishing a hierarchical relationship. It then triggers layout updates by adding the 'b' class to the parent and explicitly calling `didUpdate` on the root projection. Finally, it uses `requestAnimationFrame` to perform an asynchronous check on the projection frames, verifying the state of the layout system after the updates.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox, checkFrame } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const parentProjection = createNode(
  parent, undefined, {}, { duration: 0.0001 }
)
const child = document.getElementById("child")
const childProjection = createNode(
  child, parentProjection, {}, { duration: 0.1 }
)
const grandChild = document.getElementById("grandChild")
const grandChildProjection = createNode(
  grandChild, childProjection, {}, { duration: 0.1 }
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