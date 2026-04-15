# Implement Framer Motion Layout Animations and Assertions in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-mix-finish.html

This JavaScript code demonstrates creating and manipulating DOM elements (`#box-a`, `#box-b`) using Framer Motion's `createNode` for layout animations. It sets up projections, updates properties like `borderRadius`, and then uses `setTimeout` to assert various visual properties (viewport box, visibility, opacity, border-radius) of the elements after a short delay, likely to verify animation results.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box-a")
const boxProjection = createNode(
  box,
  undefined,
  { layoutId: "a" },
  { duration: 0.05 }
)
boxProjection.willUpdate()
const newBox = document.createElement("div")
newBox.id = "box-b"
document.body.appendChild(newBox)
const newBoxProjection = createNode(
  newBox,
  undefined,
  { layoutId: "a", },
  { duration: 0.05 }
)
newBoxProjection.setValue("borderRadius", 20)
newBoxProjection.root.didUpdate()
const finBox = { bottom: 400, left: 100, right: 300, top: 100 }
setTimeout(() => {
  matchViewportBox(box, finBox)
  matchViewportBox(newBox, finBox)
  matchVisibility(box, "visible")
  matchVisibility(newBox, "visible")
  // should be 0/1 instead of approximate to 0/1
  matchOpacity(box, 0)
  matchOpacity(newBox, 1)
  /**
   * First box has an active transform applied whereas the second
   * box doesn't. As such only the first box needs a border-radius that
   * corrects for scale distortion.
   */
  matchBorderRadius(box, "10% / 6.66667%")
  matchBorderRadius(newBox, "20px")
}, 150)
```

--------------------------------