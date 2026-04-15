# Framer Motion Projection with Skew Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-skew-change.html

Implements DOM element projection using Framer Motion's createNode API to apply and animate skew transformations across multiple animation frames. Validates layout correctness by matching viewport box position and skew values, triggering post-render callbacks for assertion checks.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchSkewX } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
boxProjection.setValue("skewX", 10)
requestAnimationFrame(() => {
  const boxOrigin = box.getBoundingClientRect()
  boxProjection.setValue("skewX", 30)
  requestAnimationFrame(() => {
    boxProjection.willUpdate()
    box.classList.add("b")
    boxProjection.setValue("skewX", 10)
    boxProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(box, boxOrigin)
      matchSkewX(box, 10)
    })
  })
})
```

--------------------------------