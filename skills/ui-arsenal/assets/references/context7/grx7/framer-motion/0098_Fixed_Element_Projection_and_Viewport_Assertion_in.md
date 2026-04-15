# Fixed Element Projection and Viewport Assertion in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-page-scroll-layout-change.html

Initializes a projection node for a fixed element, simulates a window scroll, and updates the element's position. It uses an assertion library to verify that the element's viewport box remains consistent with its origin after layout updates.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll, } = window.Assert
const { frame } = window.Projection
const fixed = document.getElementById("fixed")
const fixedProjection = createNode(fixed, undefined, {
  layoutScroll: true,
  layout: true,
})
const fixedOrigin = fixed.getBoundingClientRect()
fixedProjection.willUpdate()
const scrollDistance = 100
window.scrollTo(scrollDistance, scrollDistance)
fixed.style.top = "50px"
fixed.style.left = "50px"
fixedProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(fixed, fixedOrigin)
}, 50)
```

--------------------------------