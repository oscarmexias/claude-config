# Create and Manage Layout Projection Hierarchy in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-element-scroll-shared-child.html

Initializes a projection node hierarchy for layout animation tracking, creates DOM elements with projection metadata, performs scroll operations, and validates viewport positioning. Uses Undo, Assert, and Projection APIs to manage layout state across nested elements.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll, } = window.Assert
const { frame } = window.Projection

const scroller = document.getElementById("scroller")
const scrollerProjection = createNode(scroller, undefined, {
  layoutScroll: true,
})

const sticky = document.getElementById("sticky")
const stickyProjection = createNode(sticky, scrollerProjection)

const child = document.querySelector(".child")
const childProjection = createNode(child, stickyProjection, {
  layoutId: "child",
})

const childOrigin = child.getBoundingClientRect()

stickyProjection.willUpdate()
childProjection.willUpdate()

const newChild = document.createElement("div")
newChild.classList.add("child")
sticky.appendChild(newChild)

const newChildProjection = createNode(newChild, stickyProjection, {
  layoutId: "child",
})

scroller.scrollTo(0, 100)
stickyProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(child, childOrigin)
  matchViewportBox(newChild, childOrigin)
}, 50)
```

--------------------------------