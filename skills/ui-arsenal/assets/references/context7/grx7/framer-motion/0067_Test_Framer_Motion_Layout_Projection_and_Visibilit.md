# Test Framer Motion Layout Projection and Visibility with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-block-update-promote-new.html

This JavaScript snippet demonstrates and tests layout projection using a Framer Motion-like API. It initializes two projected nodes (`boxProjection`, `newBoxProjection`) with the same `layoutId` to simulate a layout transition. The code then performs a series of assertions using `matchViewportBox`, `matchVisibility`, and `matchOpacity` to verify the elements' positions, visibility, and opacity before and after a simulated layout update and promotion, ensuring correct animation behavior.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box-a")
const boxProjection = createNode(box, undefined, { layoutId: "a", crossfade: false, })
const boxOrigin = box.getBoundingClientRect()
boxProjection.root.blockUpdate()
boxProjection.willUpdate()
const newBox = document.createElement("div")
newBox.id = "box-b"
document.body.appendChild(newBox)
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", crossfade: false, })
boxProjection.root.didUpdate()
const newBoxOrigin = { bottom: 400, height: 300, left: 100, right: 300, top: 100, width: 200, }
setTimeout(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(newBox, newBoxOrigin)
  matchVisibility(box, "hidden")
  matchVisibility(newBox, "visible")
  matchOpacity(newBox, 1)
  boxProjection.willUpdate()
  newBoxProjection.willUpdate()
  boxProjection.promote()
  boxProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(box, newBoxOrigin)
    matchViewportBox(newBox, newBoxOrigin)
    matchVisibility(box, "visible")
    matchVisibility(newBox, "hidden")
    matchOpacity(box, 1)
  })
}, 50)
```

--------------------------------