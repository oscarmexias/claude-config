# Initialize Framer Motion Projections and Simulate Scroll

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-no-layout-change-stick.html

This JavaScript snippet initializes Framer Motion projection nodes for an overlay and a box element. It simulates a page scroll using `window.scrollTo` and then updates the projection tree. Finally, it asserts the viewport position of the box element, likely for testing layout and scroll behavior with Framer Motion's projection system.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const overlay = document.getElementById("overlay")
const overlayProjection = createNode(overlay, undefined, { layoutRoot: true, layout: true, })
const box = document.getElementById("box")
const boxProjection = createNode(box, overlayProjection)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
const scrollOffset = [50, 100]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
matchViewportBox(box, { top: 0, left: -50, bottom: 100, right: 50 })
```

--------------------------------