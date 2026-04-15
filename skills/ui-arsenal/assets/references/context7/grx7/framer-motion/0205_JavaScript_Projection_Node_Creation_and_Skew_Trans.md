# JavaScript Projection Node Creation and Skew Transform Application

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-skew-container.html

Creates projection nodes for DOM elements and applies skew transformations using a projection system. Initializes container and box projections with parent-child relationships, sets skew values, and triggers layout updates across animation frames. Uses requestAnimationFrame for synchronized rendering and viewport box matching.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchSkewX } = window.Assert
const { frame } = window.Projection
const container = document.getElementById("container")
const containerProjection = createNode(container)
const box = document.getElementById("box")
const boxProjection = createNode(box, containerProjection)
containerProjection.setValue("skewX", 20)
containerProjection.setValue("skewY", -20)
requestAnimationFrame(() => {
  const boxOrigin = box.getBoundingClientRect()
  boxProjection.willUpdate()
  containerProjection.willUpdate()
  container.classList.add("b")
  requestAnimationFrame(() => {
    containerProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(box, boxOrigin)
      matchSkewX(container, 20)
    })
  })
})
```

--------------------------------