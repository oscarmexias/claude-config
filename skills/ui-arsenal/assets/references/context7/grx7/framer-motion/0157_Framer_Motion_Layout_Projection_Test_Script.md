# Framer Motion Layout Projection Test Script

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-from-static.html

JavaScript test code that validates Framer Motion's projection system for fixed positioning elements. It creates projection nodes for parent and child elements, simulates viewport scrolling, and verifies that viewport box calculations match expected values after layout updates.

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

fixed.style.position = "fixed"
fixed.style.justifyContent = "flex-end"
fixedProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(fixed, { top: -100, left: -100, right: 400, bottom: 0 })
  matchViewportBox(child, { top: -100, left: -100, right: 0, bottom: 0 })
}, 50)
```

--------------------------------