# JavaScript Layout Projection and Viewport Matching Test

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-page-scroll-layout-change.html

Tests framer-motion's layout projection system by creating projection nodes for fixed and child elements, simulating scroll events, mutating styles, and verifying viewport box alignment. Uses window utilities for node creation, assertion matching, and projection frame management.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll } = window.Assert
const { frame } = window.Projection

const fixed = document.getElementById("fixed")
const fixedProjection = createNode(fixed, undefined, { layoutScroll: true, layout: true })
const fixedOrigin = fixed.getBoundingClientRect()

const child = document.getElementById("child")
const childProjection = createNode(child, fixedProjection)
const childOrigin = child.getBoundingClientRect()

childProjection.willUpdate()
fixedProjection.willUpdate()

const scrollDistance = 100
window.scrollTo(scrollDistance, scrollDistance)

fixed.style.justifyContent = "flex-end"
fixed.style.top = "50px"
fixed.style.left = "50px"

fixedProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(fixed, fixedOrigin)
  matchViewportBox(child, { top: 0, left: 0, right: 100, bottom: 100 })
}, 50)
```

--------------------------------