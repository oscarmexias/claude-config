# JavaScript Framer Motion Projection Setup for Scrolling and Sticky Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-element-scroll-child.html

This JavaScript code initializes Framer Motion's projection system to test layout and scrolling behavior. It creates projection nodes for a scroller, a sticky element, and a child, then simulates a scroll and a class change to observe layout updates and asserts the child's viewport box after a delay.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll, } = window.Assert
const { frame } = window.Projection
const scroller = document.getElementById("scroller")
const scrollerProjection = createNode(scroller, undefined, { layoutScroll: true, })
const sticky = document.getElementById("sticky")
const stickyProjection = createNode(sticky, scrollerProjection, { layoutRoot: true, })
const child = document.getElementById("child")
const childProjection = createNode(child, stickyProjection)
const childOrigin = child.getBoundingClientRect()
stickyProjection.willUpdate()
childProjection.willUpdate()
scroller.scrollTo(0, 100)
sticky.classList.add("b")
stickyProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(child, childOrigin)
}, 50)
```

--------------------------------