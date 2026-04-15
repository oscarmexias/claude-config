# JavaScript Sticky Element Projection and Viewport Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-to-fixed-page-scroll.skip.html

Manages sticky element projection lifecycle, captures initial viewport position, applies scroll offset, switches element positioning class, updates projection state, and validates layout correction by matching viewport box coordinates. Uses Framer Motion's projection and assertion utilities to ensure proper element positioning after scroll events.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll } = window.Assert
const { frame } = window.Projection

const sticky = document.querySelector(".sticky")
const stickyProjection = createNode(sticky, undefined)
stickyProjection.willUpdate()

const scrollOffset = [50, 150]
window.scrollTo(...scrollOffset)

const stickyOrigin = sticky.getBoundingClientRect()
sticky.classList.add("b")
stickyProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(sticky, stickyOrigin)
}, 50)
```

--------------------------------