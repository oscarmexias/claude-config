# Framer Motion Projection Node Creation and Viewport Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-within-element-scroll.html

Demonstrates creating projection nodes for layout tracking in Framer Motion, including container and fixed-positioned element hierarchies. Tests viewport box matching after scroll events and validates that fixed elements maintain correct positioning relative to their parent containers and scroll offsets.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll } = window.Assert
const { frame } = window.Projection

const container = document.getElementById("container")
const containerProjection = createNode(container, undefined, {
  layoutScroll: true,
  layout: false,
})

const fixed = document.getElementById("fixed")
const fixedProjection = createNode(fixed, containerProjection, {
  layoutScroll: true,
  layout: true,
})

const fixedOrigin = fixed.getBoundingClientRect()

const child = document.getElementById("child")
const childProjection = createNode(child, fixedProjection)
const childOrigin = child.getBoundingClientRect()

childProjection.willUpdate()
fixedProjection.willUpdate()

container.scrollLeft = 200
fixedProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(fixed, fixedOrigin)
  matchViewportBox(child, {
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  })
}, 50)
```

--------------------------------