# Initialize Framer Motion Projections and Assertions in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-child.html

This JavaScript snippet initializes Framer Motion's projection system and assertion utilities. It retrieves DOM elements, creates projection nodes for them, scrolls the window, and then asserts the viewport box of an element against its original position. It relies on global `window.Undo`, `window.Assert`, and `window.Projection` objects for its functionality.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const overlay = document.getElementById("overlay")
const overlayProjection = createNode(overlay, undefined, { layoutRoot: true, })
const box = document.getElementById("box")
const boxProjection = createNode(box, overlayProjection)
const scrollOffset = [50, 150]
window.scrollTo(...scrollOffset)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
boxProjection.root.didUpdate()
matchViewportBox(box, boxOrigin)
```

--------------------------------