# JavaScript Layout Projection and Viewport Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/flexbox-siblings-to-grid-page-scroll.html

Manages DOM element projection nodes, applies layout transformations including border radius and opacity, and synchronizes element positions with viewport calculations after scroll events. Uses frame-based post-render callbacks to ensure layout correctness.

```javascript
const { createNode } = window.Undo
const { matchOpacity, matchBorderRadius, matchViewportBox, addPageScroll } = window.Assert
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
  matchOpacity(a, 1)
  matchOpacity(b, 1)
  matchBorderRadius(a, "13.3333% / 10%")
  matchBorderRadius(b, "")
})
```

--------------------------------