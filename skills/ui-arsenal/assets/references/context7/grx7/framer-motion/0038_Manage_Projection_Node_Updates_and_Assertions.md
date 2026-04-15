# Manage Projection Node Updates and Assertions

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-layout-change.html

Demonstrates creating projection nodes for DOM elements, triggering layout updates through style changes, and asserting viewport box consistency using custom helpers.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll, } = window.Assert
const { frame } = window.Projection
const scrollDistance = 100
window.scrollTo(scrollDistance, scrollDistance)
const fixed = document.getElementById("fixed")
const fixedProjection = createNode(fixed, undefined, { layoutScroll: true, layout: true, })
const fixedOrigin = fixed.getBoundingClientRect()
const child = document.getElementById("child")
const childProjection = createNode(child, fixedProjection)
const childOrigin = child.getBoundingClientRect()
childProjection.willUpdate()
fixedProjection.willUpdate()
fixed.style.justifyContent = "flex-end"
fixed.style.top = "50px"
fixed.style.left = "50px"
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