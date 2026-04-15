# JavaScript 3D Projection Node Creation and Transform Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-perspective-container.html

Creates projection nodes for nested DOM elements, applies 3D transforms (rotateX, perspective, z-index), and tests viewport box matching after layout changes. Uses requestAnimationFrame for animation frame synchronization and validates transform calculations across the DOM hierarchy.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchSkewX } = window.Assert
const { frame } = window.Projection
const container = document.getElementById("container")
const containerProjection = createNode(container, undefined, { layout: false })
const box = document.getElementById("box")
const boxProjection = createNode(box, containerProjection)
const boxChild = document.getElementById("box-child")
const boxChildProjection = createNode(boxChild, boxProjection)
containerProjection.setValue("rotateX", 40)
containerProjection.setValue("transformPerspective", 500)
boxProjection.setValue("rotateX", 10)
boxProjection.setValue("z", 20)
requestAnimationFrame(() => {
  const containerOrigin = container.getBoundingClientRect()
  const boxOrigin = box.getBoundingClientRect()
  const boxChildOrigin = boxChild.getBoundingClientRect()
  boxProjection.willUpdate()
  boxChildProjection.willUpdate()
  containerProjection.willUpdate()
  container.classList.add("b")
  requestAnimationFrame(() => {
    containerProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(container, containerOrigin)
      matchViewportBox(box, boxOrigin)
      matchViewportBox(boxChild, boxChildOrigin)
    })
  })
})
```

--------------------------------