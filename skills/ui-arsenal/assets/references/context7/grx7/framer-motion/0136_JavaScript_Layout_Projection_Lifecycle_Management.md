# JavaScript Layout Projection Lifecycle Management

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-rotate.html

Demonstrates how to use the Projection and Undo APIs to track DOM changes. It captures the initial bounding box, triggers a class change, and uses post-render hooks to validate the layout projection.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
boxProjection.setValue("rotate", 45)
requestAnimationFrame(() => {
  const boxOrigin = box.getBoundingClientRect()
  boxProjection.willUpdate()
  box.classList.add("b")
  boxProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(box, boxOrigin)
  })
})
```

--------------------------------