# JavaScript Layout Projection and Assertion Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-nested-parent-scale-child-layout-change.html

Initializes projection nodes for DOM elements and manages layout updates using a frame scheduler. It captures initial bounding boxes, triggers a class change, and verifies that the viewport boxes match the expected origins after the update.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const child = document.getElementById("child")
const parentProjection = createNode(parent)
const childProjection = createNode(child, parentProjection)
parentProjection.setValue("scale", 2)
frame.postRender(() => {
  const parentOrigin = parent.getBoundingClientRect()
  const childOrigin = child.getBoundingClientRect()
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