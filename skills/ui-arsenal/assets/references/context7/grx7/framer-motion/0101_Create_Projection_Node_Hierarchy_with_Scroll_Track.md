# Create Projection Node Hierarchy with Scroll Tracking

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-remove.html

Establishes a three-level projection hierarchy (scroll container → container → box) using createNode. Enables layout scroll tracking on the root scroll element to monitor viewport changes during component lifecycle events.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchOpacity, matchBorderRadius, addPageScroll } = window.Assert
const { frame } = window.Projection

const scroll = document.getElementById("scroll")
const container = document.getElementById("container")
const box = document.getElementById("box-1")

const scrollProjection = createNode(scroll, undefined, {
  layoutId: "scroll",
  layoutScroll: true
})

const containerProjection = createNode(
  container,
  scrollProjection,
  { layoutId: "container" }
)

const boxProjection = createNode(box, containerProjection, {
  layoutId: "a"
})
```

--------------------------------