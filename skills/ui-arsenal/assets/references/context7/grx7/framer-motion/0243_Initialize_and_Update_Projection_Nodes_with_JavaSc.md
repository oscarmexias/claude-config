# Initialize and Update Projection Nodes with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-no-layout-change.html

This JavaScript code demonstrates the initialization and update process for 'projection' nodes, likely from a library similar to Framer Motion. It creates projection nodes for an overlay and a box element, sets a specific window scroll offset, and then performs an assertion to match the box's viewport position. This snippet relies on global `window.Undo`, `window.Assert`, and `window.Projection` objects for its functionality.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const overlay = document.getElementById("overlay")
const overlayProjection = createNode(overlay, undefined, { layoutScroll: true, layout: false, })
const box = document.getElementById("box")
const boxProjection = createNode(
  box,
  overlayProjection
  // undefined,
  // { duration: 1 }
)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
const scrollOffset = [50, 100]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
matchViewportBox(box, {
  top: 200,
  left: -50,
  bottom: 300,
  right: 50,
})
```

--------------------------------