# Fixed Element Projection and Scroll Validation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-page-scroll.html

Initializes a projection node for a fixed element and validates that its viewport position remains correct after a window scroll event. It utilizes window-level testing globals like Undo and Assert.

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
fixedProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(fixed, fixedOrigin)
}, 50)
```

--------------------------------