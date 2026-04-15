# Initialize Framer Motion Projection and Match Viewport Box with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-change-with-stick.html

This JavaScript snippet initializes a Framer Motion projection node for a DOM element with the ID 'box'. It then uses `requestAnimationFrame` to perform layout updates, scroll the window, and assert the viewport position of the 'box' element using `matchViewportBox`. This is typically used for testing and verifying layout behavior with Framer Motion.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box, undefined, { layoutRoot: true, })
requestAnimationFrame(() => {
  boxProjection.willUpdate()
  const scrollOffset = [50, 150]
  window.scrollTo(...scrollOffset)
  boxProjection.root.didUpdate()
  matchViewportBox(box, { top: 0, left: -50, bottom: 100, right: 50, })
})
```

--------------------------------