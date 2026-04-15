# Implement JavaScript Layout Projection with State Changes

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-with-child-layout-change-interrupt.html

This JavaScript code demonstrates the use of projection nodes to track and assert the layout of DOM elements (`#box` and `#child`). It initializes projection nodes, applies and removes CSS classes (`.b`) to trigger layout changes, and uses `matchViewportBox` to verify that the elements' viewport positions remain consistent relative to their initial state after these changes, likely within a testing or animation context.

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
  boxProjection.willUpdate()
  childProjection.willUpdate()
  box.classList.remove("b")
  child.classList.remove("b")
  boxProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(box, boxOrigin)
    matchViewportBox(child, childOrigin)
  })
})
```

--------------------------------