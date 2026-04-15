# Initialize and test Framer Motion projections for sticky and fixed elements in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-shared-to-fixed-page-scroll-stick.html

This JavaScript code initializes `Undo`, `Assert`, and `Projection` utilities from `window` objects, likely part of a testing or animation framework like Framer Motion. It creates projection nodes for a sticky and a dynamically created fixed element, sets up initial scroll, and then uses `setTimeout` to assert their viewport positions after a short delay. This snippet demonstrates how to programmatically control and test element layouts and animations.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll, } = window.Assert
const { frame } = window.Projection
const sticky = document.querySelector(".sticky")
const stickyProjection = createNode(sticky, undefined, { layoutId: "sticky", })
const stickyOrigin = sticky.getBoundingClientRect()
stickyProjection.willUpdate()
const scrollOffset = [50, 300]
window.scrollTo(...scrollOffset)
const fixed = document.createElement("div")
fixed.classList.add("fixed")
document.body.appendChild(fixed)
const fixedProjection = createNode(fixed, undefined, { layoutId: "sticky", })
fixedProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(sticky, addPageScroll(stickyOrigin, 50, 300))
  matchViewportBox(fixed, addPageScroll(stickyOrigin, 50, 300))
}, 50)
```

--------------------------------