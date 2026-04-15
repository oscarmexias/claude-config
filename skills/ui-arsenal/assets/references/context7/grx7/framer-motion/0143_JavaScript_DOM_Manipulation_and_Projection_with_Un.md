# JavaScript DOM Manipulation and Projection with Undo/Assert Libraries

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-with-child.html

This JavaScript code initializes DOM elements and uses 'window.Undo' to create projection nodes for them, potentially for animation or layout testing. It captures initial bounding box positions, applies a CSS class to the box, triggers projection updates, and then asserts that the viewport boxes match their original positions after a render cycle. This suggests a testing or validation scenario for layout changes, ensuring elements maintain expected positions.

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
boxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(child, childOrigin)
})
```

--------------------------------