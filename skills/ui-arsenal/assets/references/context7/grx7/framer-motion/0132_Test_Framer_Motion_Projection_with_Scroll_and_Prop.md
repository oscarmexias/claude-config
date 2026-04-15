# Test Framer Motion Projection with Scroll and Property Updates (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-non-zero.html

This JavaScript snippet demonstrates how to use Framer Motion's `Projection` and `Assert` utilities to test element properties within a scrollable context. It initializes projection nodes for a scroll container and a box, applies a `borderRadius` value, simulates a scroll, and then asserts the `viewportBox`, `opacity`, and `borderRadius` after rendering. It relies on global `Undo`, `Assert`, and `Projection` objects provided by the testing environment.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll, matchOpacity, matchBorderRadius,
} = window.Assert
const { frame } = window.Projection
const scroll = document.getElementById("scroll")
const box = document.getElementById("box")
scroll.scrollLeft = 100
const boxOrigin = box.getBoundingClientRect()
const scrollProjection = createNode(scroll, undefined, { layoutScroll: true,
})
const boxProjection = createNode(box, scrollProjection)
boxProjection.setValue("borderRadius", 20)
boxProjection.willUpdate()
scroll.scrollLeft = 50
boxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(box, addPageScroll(boxOrigin, -50, 0))
  matchOpacity(box, 1)
  matchBorderRadius(box, "20px")
})
```

--------------------------------