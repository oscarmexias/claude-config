# JavaScript Projection Node Management and Viewport Assertion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-single-layout-change-with-scale.html

Demonstrates how to create a projection node for a DOM element, apply transformations like scaling, and assert that the rendered viewport box matches expected dimensions. It utilizes frame scheduling to ensure assertions happen post-render.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
boxProjection.setValue("scale", 2)
frame.postRender(() => {
  const transformedBox = {
    top: -50,
    left: -50,
    right: 150,
    bottom: 150,
  }
  matchViewportBox(box, transformedBox)
  boxProjection.willUpdate()
  box.classList.add("b")
  boxProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(box, transformedBox)
  })
})
```

--------------------------------