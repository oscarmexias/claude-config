# Framer Motion Projection and Viewport Box Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-single-with-scale.html

Initializes a projection node for a DOM element, applies a 2x scale transformation, and uses post-render callbacks to match the element's viewport box against a transformed bounding rectangle. The code validates layout correctness by updating projection state and verifying viewport positioning.

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
    bottom: 150
  }
  matchViewportBox(box, transformedBox)
  boxProjection.willUpdate()
  boxProjection.root.didUpdate()
  matchViewportBox(box, transformedBox)
})
```

--------------------------------