# Initialize Framer Motion Projections and Test Layout with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-page-scroll.html

This JavaScript code initializes Framer Motion's internal projection system for specific DOM elements, simulates user interactions like scrolling and style changes, and then asserts the correctness of their viewport positions. It relies on global `window.Undo`, `window.Assert`, and `window.Projection` objects for its functionality, creating projection nodes for a fixed element and its child, then verifying their layout after modifications.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll,
} = window.Assert
const { frame } = window.Projection
const fixed = document.getElementById("fixed")
const fixedProjection = createNode(fixed, undefined, { layoutScroll: true, layout: true,
})
const fixedOrigin = fixed.getBoundingClientRect()
const child = document.getElementById("child")
const childProjection = createNode(child, fixedProjection)
const childOrigin = child.getBoundingClientRect()
childProjection.willUpdate()
fixedProjection.willUpdate()
const scrollDistance = 100
window.scrollTo(scrollDistance, scrollDistance)
fixed.style.justifyContent = "flex-end"
fixedProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(fixed, fixedOrigin)
  matchViewportBox(child, {
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  })
}, 50)
```

--------------------------------