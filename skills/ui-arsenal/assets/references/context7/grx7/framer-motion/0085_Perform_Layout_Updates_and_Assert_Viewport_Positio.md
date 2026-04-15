# Perform Layout Updates and Assert Viewport Positions with Projection (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/nested-layout-change-mid-projection.html

This JavaScript code demonstrates how to use custom `Undo`, `Assert`, and `Projection` utilities to manage and test UI layout. It initializes projection nodes for `#box` and `#child`, applies CSS class changes to trigger layout updates, and then uses `matchViewportBox` to assert that the elements' positions match their expected original bounding rectangles after rendering cycles. This pattern is common in testing animation or layout systems.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const child = document.getElementById("child")
const childProjection = createNode(child, boxProjection)
const boxOrigin = box.getBoundingClientRect()
const childOrigin = child.getBoundingClientRect()
boxProjection.willUpdate()
childProjection.willUpdate()
box.classList.add("b")
child.classList.add("b")
boxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(child, childOrigin)
  // Second render
  childProjection.willUpdate()
  child.classList.add("b")
  boxProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(box, boxOrigin)
    matchViewportBox(child, childOrigin)
  })
})
```

--------------------------------