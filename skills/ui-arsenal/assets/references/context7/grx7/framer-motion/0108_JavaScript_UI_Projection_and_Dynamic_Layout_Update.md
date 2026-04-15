# JavaScript UI Projection and Dynamic Layout Updates with Framer Motion Utilities

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-nested-parent-layout-change-scale-child-layout-change.html

This JavaScript code demonstrates the use of `createNode`, `matchViewportBox`, and `frame` utilities (likely from Framer Motion) to manage UI element projections. It creates projection nodes for parent and child elements, applies transformations (scale, x-position), and then dynamically updates the parent's class and verifies the viewport box positions after the update, ensuring layout consistency.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const child = document.getElementById("child")
const parentProjection = createNode(parent)
const childProjection = createNode(child, parentProjection)
parentProjection.setValue("scale", 2)
parentProjection.setValue("x", 400)
frame.postRender(() => {
  const parentOrigin = parent.getBoundingClientRect()
  const childOrigin = child.getBoundingClientRect()
  parentProjection.willUpdate()
  childProjection.willUpdate()
  parent.classList.add("b")
  childProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(parent, parentOrigin)
    matchViewportBox(child, childOrigin)
  })
})
```

--------------------------------