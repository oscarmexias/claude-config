# Initialize Framer Motion Projections and Animate Elements in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-nested-deep.html

This JavaScript code initializes a series of `Projection` nodes using Framer Motion's `createNode` function, establishing a parent-child relationship between HTML elements. It defines a custom easing function that changes after the first two frames. The code then triggers updates for these projections, applies a CSS class to the parent, and uses `matchViewportBox` within `frame.postRender` to assert the final layout of the grandchild element, likely for testing or debugging animation correctness.

```javascript
const { frame, frameData } = window.Projection
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const parent = document.getElementById("parent")
const mid = document.getElementById("mid")
const child = document.getElementById("child")
const grandchild = document.getElementById("grandchild")
const childOrigin = child.getBoundingClientRect()
let prevTimestamp = 0
let count = 0
const frameEasing = (t) => { // Increment ease if new frame if (prevTimestamp !== frameData.timestamp) { count++ } prevTimestamp = frameData.timestamp return count < 2 ? t : 0.5 }
const parentProjection = createNode(
 parent, undefined, {}, { duration: 200, ease: frameEasing }
)
const midProjection = createNode(
 mid, parentProjection, {}, { duration: 200, ease: frameEasing }
)
const childProjection = createNode(
 child, midProjection, {}, { duration: 200, ease: frameEasing }
)
const grandchildProjection = createNode(
 grandchild, childProjection, {}, { duration: 200, ease: frameEasing }
)
parentProjection.willUpdate()
midProjection.willUpdate()
childProjection.willUpdate()
grandchildProjection.willUpdate()
parent.classList.add("b")
parentProjection.root.didUpdate()
frame.postRender(() => {
 frame.postRender(() => {
 matchViewportBox(
 grandchild, {
 bottom: 71, height: 20, left: 51, right: 71, top: 51, width: 20,
 }, 2
 )
 })
})
```

--------------------------------