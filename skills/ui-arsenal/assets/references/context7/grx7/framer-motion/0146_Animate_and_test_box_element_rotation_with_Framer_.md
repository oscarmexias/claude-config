# Animate and test box element rotation with Framer Motion-like library

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-rotate-change.html

This JavaScript code initializes a box element using a projection library (likely Framer Motion or a similar internal tool). It sets initial rotation, then uses `requestAnimationFrame` to sequence changes: first, it updates the rotation, then adds a class to the box, updates rotation again, and finally asserts the viewport box position after rendering. This sequence simulates an animation and tests its layout correctness.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
boxProjection.setValue("rotate", 75)
requestAnimationFrame(() => {
  const boxOrigin = box.getBoundingClientRect()
  boxProjection.setValue("rotate", 45)
  requestAnimationFrame(() => {
    boxProjection.willUpdate()
    box.classList.add("b")
    boxProjection.setValue("rotate", 75)
    boxProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(box, boxOrigin)
    })
  })
})
```

--------------------------------