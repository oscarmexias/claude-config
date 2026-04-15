# DOM Projection and Viewport Box Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-single-layout-change-with-scale-change.html

Initializes a projection node for a DOM element, captures its bounding rectangle, and uses frame-based rendering to apply viewport box matching and scale transformations. Updates the element's class and applies transformed box coordinates through post-render callbacks.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  boxProjection.willUpdate()
  boxProjection.setValue("scale", 2)
  box.classList.add("b")
  const transformedBox = {
    top: -50,
    left: -50,
    right: 150,
    bottom: 150
  }
  boxProjection.root.didUpdate()
  frame.postRender(() => matchViewportBox(box, transformedBox))
})
```

--------------------------------