# Projection Node Management and Viewport Assertion in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll-scale.html

Initializes projection nodes for DOM elements, applies transformations like scaling, and uses requestAnimationFrame to trigger updates and verify layout accuracy against original bounding boxes using internal testing utilities.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const button = document.getElementById("button")
const buttonProjection = createNode(button, boxProjection)
const scrollDistance = 100
window.scrollTo(scrollDistance, scrollDistance)
boxProjection.setValue("scale", 2)
boxProjection.options.visualElement.render()
const boxOrigin = box.getBoundingClientRect()
const buttonOrigin = button.getBoundingClientRect()
requestAnimationFrame(() => {
  buttonProjection.willUpdate()
  boxProjection.willUpdate()
  boxProjection.root.didUpdate()
  matchViewportBox(box, boxOrigin)
  matchViewportBox(button, buttonOrigin)
})
```

--------------------------------