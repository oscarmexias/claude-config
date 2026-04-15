# Programmatically Update Element Layout and Assert Viewport (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-single-with-scale-change.html

This JavaScript code snippet uses custom global objects (`window.Undo`, `window.Assert`, `window.Projection`) to programmatically manipulate and test the layout of a DOM element. It creates a projection node for the `#box` element, scales it by a factor of 2, and then uses `matchViewportBox` to assert its position against expected coordinates both before and after the transformation, indicating a layout testing or animation system.

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
  const transformedBox = {
    top: -50,
    left: -50,
    right: 150,
    bottom: 150,
  }
  boxProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(box, transformedBox)
  })
})
```

--------------------------------