# Layout Projection and Assertion Logic in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/flexbox-siblings-to-grid-page-scroll-interrupt.html

Initializes projection nodes for DOM elements and performs layout updates. It uses a custom assertion library to verify that elements maintain their expected viewport boxes and styles after layout shifts and scrolling.

```javascript
const { createNode } = window.Undo
const { matchOpacity, matchBorderRadius, matchViewportBox, addPageScroll, } = window.Assert
const { frame } = window.Projection
const container = document.getElementById("container")
const a = document.getElementById("a")
const b = document.getElementById("b")
const aOrigin = a.getBoundingClientRect()
const bOrigin = b.getBoundingClientRect()
const aProjection = createNode(a)
const bProjection = createNode(b)
aProjection.setValue("borderRadius", 20)
aProjection.willUpdate()
bProjection.willUpdate()
container.classList.add("as-grid")
window.scrollTo(50, 100)
aProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(a, addPageScroll(aOrigin, 50, 100))
  matchViewportBox(b, addPageScroll(bOrigin, 50, 100))
  aProjection.willUpdate()
  bProjection.willUpdate()
  container.classList.remove("as-grid")
  window.scrollTo(0, 0)
  aProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(a, aOrigin)
    matchViewportBox(b, bOrigin)
    matchOpacity(a, 1)
    matchOpacity(b, 1)
    matchBorderRadius(a, "20px")
    matchBorderRadius(b, "")
  })
})
```

--------------------------------