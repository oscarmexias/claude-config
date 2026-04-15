# Framer Motion Scroll Projection and Layout Tracking

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll.html

Initializes Framer Motion projection nodes for a scrollable container and child box element, sets border radius properties, applies scroll offsets, and validates element properties (viewport box, opacity, border radius) in a post-render callback. Requires window.Undo, window.Assert, and window.Projection global objects.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll, matchOpacity, matchBorderRadius } = window.Assert
const { frame } = window.Projection

const scroll = document.getElementById("scroll")
const box = document.getElementById("box")
const boxOrigin = box.getBoundingClientRect()

const scrollProjection = createNode(scroll, undefined, { layoutScroll: true })
const boxProjection = createNode(box, scrollProjection)

boxProjection.setValue("borderRadius", 20)
boxProjection.willUpdate()

scroll.scrollLeft = 50
boxProjection.root.didUpdate()

frame.postRender(() => {
  matchViewportBox(box, addPageScroll(boxOrigin, 50, 0))
  matchOpacity(box, 1)
  matchBorderRadius(box, "20px")
})
```

--------------------------------