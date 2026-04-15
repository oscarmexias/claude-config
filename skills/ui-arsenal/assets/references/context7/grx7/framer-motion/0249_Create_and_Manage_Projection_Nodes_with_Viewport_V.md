# Create and Manage Projection Nodes with Viewport Validation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/nested-layout-change-scale-correction.html

JavaScript code that creates projection nodes for parent and child DOM elements, captures their initial viewport positions, applies layout changes, and uses post-render callbacks to validate correct positioning. Depends on Undo, Assert, and Projection modules from Framer Motion.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const child = document.getElementById("child")
const parentProjection = createNode(parent)
const childProjection = createNode(child, parentProjection)
const parentOrigin = parent.getBoundingClientRect()
const childOrigin = child.getBoundingClientRect()
parentProjection.willUpdate()
childProjection.willUpdate()
parent.classList.add("b")
parentProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(parent, parentOrigin)
  matchViewportBox(child, childOrigin)
})
```

--------------------------------