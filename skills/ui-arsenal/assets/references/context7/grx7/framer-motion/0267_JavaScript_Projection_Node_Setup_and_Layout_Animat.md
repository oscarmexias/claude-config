# JavaScript Projection Node Setup and Layout Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/flexbox-siblings-layout-group.html

Initializes projection nodes for DOM elements, captures initial bounding rectangles, creates a node group, applies border-radius styling, and manipulates the flex container direction. Uses post-render callbacks to verify viewport positioning, opacity, and border-radius properties match expected values after layout changes.

```javascript
const { frame, nodeGroup } = window.Projection
const { createNode } = window.Undo
const { matchOpacity, matchBorderRadius, matchViewportBox } = window.Assert
const container = document.getElementById("container")
const a = document.getElementById("a")
const b = document.getElementById("b")
const aOrigin = a.getBoundingClientRect()
const bOrigin = b.getBoundingClientRect()
const aProjection = createNode(a)
const bProjection = createNode(b)
aProjection.setValue("borderRadius", 20)
const group = nodeGroup()
group.add(aProjection)
group.add(bProjection)
aProjection.willUpdate()
container.style.flexDirection = "column-reverse"
aProjection.root.didUpdate()
frame.postRender(() => {
  window.scrollTo(0, 0)
  matchViewportBox(a, aOrigin)
  matchViewportBox(b, bOrigin)
  matchOpacity(a, 1)
  matchOpacity(b, 1)
  matchBorderRadius(a, "13.3333% / 10%")
  matchBorderRadius(b, "")
})
```

--------------------------------