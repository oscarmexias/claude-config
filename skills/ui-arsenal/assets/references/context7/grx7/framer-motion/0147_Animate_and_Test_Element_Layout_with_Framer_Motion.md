# Animate and Test Element Layout with Framer Motion-like API in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-with-child-rotate.html

This JavaScript snippet demonstrates the use of a projection-based animation and assertion library (likely `Framer Motion` or a similar custom implementation) to manipulate and test DOM elements. It initializes projected nodes for a `box` and its `child`, applies a rotation to the `box`, and then triggers a layout update. The code uses `requestAnimationFrame` to ensure updates are synchronized with the browser's rendering cycle and `matchViewportBox` to assert that the elements' viewport positions remain consistent after a class change, indicating correct layout behavior.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const child = document.getElementById("child")
const childProjection = createNode(child, boxProjection)
boxProjection.setValue("rotate", 45)
requestAnimationFrame(() => {
  const boxOrigin = box.getBoundingClientRect()
  const childOrigin = child.getBoundingClientRect()
  boxProjection.willUpdate()
  childProjection.willUpdate()
  box.classList.add("b")
  requestAnimationFrame(() => {
    boxProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(box, boxOrigin)
      matchViewportBox(child, childOrigin)
    })
  })
})
```

--------------------------------