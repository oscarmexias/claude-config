# JavaScript Sticky Projection Layout Test

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-element-scroll.html

Tests Framer Motion's layout projection system for sticky elements by creating projection nodes, simulating scroll events, and validating viewport box calculations. Uses assertion utilities to verify that sticky positioning is correctly tracked after scroll operations.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll } = window.Assert
const { frame } = window.Projection

const scroller = document.getElementById("scroller")
const scrollerProjection = createNode(scroller, undefined, { layoutScroll: true })

const sticky = document.getElementById("sticky")
const stickyProjection = createNode(sticky, scrollerProjection, { layoutRoot: true })

const stickyOrigin = sticky.getBoundingClientRect()
stickyProjection.willUpdate()

scroller.scrollTo(0, 100)
stickyProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(sticky, stickyOrigin)
}, 50)
```

--------------------------------