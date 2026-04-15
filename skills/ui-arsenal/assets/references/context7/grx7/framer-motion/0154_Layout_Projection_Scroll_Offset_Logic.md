# Layout Projection Scroll Offset Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-page-scroll-non-zero.html

JavaScript implementation that creates projection nodes and simulates scroll events. It uses the Projection and Assert utilities to verify that the element's viewport position is correctly calculated after scroll updates.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchOpacity, matchBorderRadius, addPageScroll, } = window.Assert
const { frame } = window.Projection
const scroll = document.getElementById("scroll")
const box = document.getElementById("box")

scroll.scrollLeft = 100
window.scrollTo(100, 100)

const boxOrigin = box.getBoundingClientRect()
const scrollProjection = createNode(scroll, undefined, { layoutScroll: true, })
const boxProjection = createNode(box, scrollProjection)

boxProjection.setValue("borderRadius", 20)
boxProjection.willUpdate()

scroll.scrollLeft = 50
window.scrollTo(50, 50)

boxProjection.root.didUpdate()

frame.postRender(() => {
  matchViewportBox(box, addPageScroll(boxOrigin, -100, -50))
  matchOpacity(box, 1)
  matchBorderRadius(box, "20px")
})
```

--------------------------------