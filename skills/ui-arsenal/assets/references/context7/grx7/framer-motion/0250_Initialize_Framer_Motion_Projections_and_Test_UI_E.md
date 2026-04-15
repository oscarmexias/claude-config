# Initialize Framer Motion Projections and Test UI Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-shared-to-fixed-page-scroll-no-stick.html

This JavaScript code initializes Framer Motion's projection system for sticky and fixed elements. It uses `createNode` to create projection nodes, simulates a scroll, dynamically appends a new fixed element, and then asserts viewport box matches after a short delay, likely for UI testing or animation setup within a Framer Motion environment.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll, } = window.Assert
const { frame } = window.Projection
const sticky = document.querySelector(".sticky")
const stickyProjection = createNode(sticky, undefined, { layoutId: "sticky", })
const stickyOrigin = sticky.getBoundingClientRect()
stickyProjection.willUpdate()
const scrollOffset = [50, 50]
window.scrollTo(...scrollOffset)
const fixed = document.createElement("div")
fixed.classList.add("fixed")
document.body.appendChild(fixed)
const fixedProjection = createNode(fixed, undefined, { layoutId: "sticky", })
fixedProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(sticky, addPageScroll(stickyOrigin, 50, 50))
  matchViewportBox(fixed, addPageScroll(stickyOrigin, 50, 50))
}, 50)
```

--------------------------------