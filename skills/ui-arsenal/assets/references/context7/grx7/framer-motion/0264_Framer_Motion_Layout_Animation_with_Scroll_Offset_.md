# Framer Motion Layout Animation with Scroll Offset Tracking

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-page-scroll.html

Implements a layout animation sequence using Framer Motion's projection system. Captures initial bounding box, applies layout changes via CSS class, scrolls the viewport, and synchronizes the projection with the new viewport position. Uses frame post-render callbacks to ensure DOM updates complete before viewport matching calculations.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
box.classList.add("b")
const scrollOffset = [50, 100]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(box, addPageScroll(boxOrigin, ...scrollOffset))
})
```

--------------------------------