# JavaScript Scroll Assertion Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll.html

Initializes a projection node for a DOM element, captures its initial bounding box, performs a window scroll, and then asserts that the new viewport position matches the expected offset.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
const scrollOffset = [50, 100]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
matchViewportBox(box, addPageScroll(boxOrigin, ...scrollOffset))
```

--------------------------------