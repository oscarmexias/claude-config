# Create and Update Projection Nodes with Scroll Handling

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll-overlay.html

Creates projection nodes for overlay and box elements using Framer Motion's projection system, applies scroll offsets, and validates viewport box positioning. The code demonstrates node hierarchy creation, scroll synchronization, and viewport box matching for layout correctness verification.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const overlay = document.getElementById("overlay")
const overlayProjection = createNode(overlay, undefined, { layoutScroll: true, layout: false })
const box = document.getElementById("box")
const boxProjection = createNode(box, overlayProjection)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
const scrollOffset = [50, 100]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
matchViewportBox(box, { top: 0, left: 0, bottom: 100, right: 100 })
```

--------------------------------