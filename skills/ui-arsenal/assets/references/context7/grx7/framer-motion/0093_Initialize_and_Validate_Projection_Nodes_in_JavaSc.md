# Initialize and Validate Projection Nodes in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-child-scroll-change-offset.html

Demonstrates how to create projection nodes for DOM elements, trigger layout updates by modifying class lists, and assert the final viewport position after a scroll event. It relies on internal window-level utilities like Undo, Assert, and Projection.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection

const overlay = document.getElementById("overlay")
const overlayProjection = createNode(overlay, undefined, {
  layoutRoot: true,
  layout: true,
})

const box = document.getElementById("box")
const boxProjection = createNode(box, overlayProjection)
const boxOrigin = box.getBoundingClientRect()

boxProjection.willUpdate()
overlay.classList.add("b")

const scrollOffset = [50, 150]
window.scrollTo(...scrollOffset)

boxProjection.root.didUpdate()

frame.postRender(() => {
  matchViewportBox(box, {
    top: 0,
    left: -50,
    bottom: 100,
    right: 50,
  })
})
```

--------------------------------