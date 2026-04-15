# Test Framer Motion Projection and Layout with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-child-scroll-change.html

This JavaScript code uses internal Framer Motion APIs to create projection nodes for an overlay and a box element. It simulates a scroll, updates projections, and asserts the box's final position relative to the viewport, demonstrating layout and projection testing.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const overlay = document.getElementById("overlay")
const overlayProjection = createNode(overlay, undefined, { layoutRoot: true, layout: true, })
const box = document.getElementById("box")
const boxProjection = createNode(box, overlayProjection)
boxProjection.willUpdate()
const scrollOffset = [50, 150]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
matchViewportBox(box, { top: 0, left: -50, bottom: 100, right: 50 })
```

--------------------------------