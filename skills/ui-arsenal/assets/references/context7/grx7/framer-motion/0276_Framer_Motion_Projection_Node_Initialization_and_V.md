# Framer Motion Projection Node Initialization and Viewport Matching (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-change-no-stick.html

This JavaScript snippet demonstrates how to create a Framer Motion projection node for a DOM element, simulate page scrolling, update the projection, and then assert the element's position within the viewport. It relies on global `Undo`, `Assert`, and `Projection` objects for its functionality, likely within a testing environment.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box, undefined, { layoutRoot: true, })
requestAnimationFrame(() => {
  boxProjection.willUpdate()
  const scrollOffset = [50, 50]
  window.scrollTo(...scrollOffset)
  boxProjection.root.didUpdate()
  matchViewportBox(box, {
    top: 50,
    left: -50,
    bottom: 150,
    right: 50,
  })
})
```

--------------------------------