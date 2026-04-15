# Animate Element Layout Changes using Projection API in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-undo-layout-change.html

This JavaScript code demonstrates how to programmatically animate layout changes for an HTML element. It utilizes a custom animation library (exposed via `window.Animate` and `window.Projection`, likely Framer Motion's internal Projection API) to create a projection node, apply a CSS class (`.b`) to trigger a size change, and then revert it. The `frame.postRender` calls ensure layout updates are synchronized, and `matchViewportBox` is used for asserting the final layout state.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const parentOrigin = parent.getBoundingClientRect()
const parentProjection = createNode(
  parent, undefined, {}, { duration: 2 }
)
parentProjection.willUpdate()
parent.classList.add("b")
parentProjection.root.didUpdate()
frame.postRender(() => {
  parentProjection.willUpdate()
  parent.classList.remove("b")
  parentProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(parent, parentOrigin, 0.5)
  })
})
```

--------------------------------