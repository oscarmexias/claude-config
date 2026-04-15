# Project Layout Transitions using JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-skew.html

Demonstrates how to create projection nodes, update layout IDs, and assert visual properties like opacity, skew, and border-radius after a layout change. It utilizes internal window-bound projection and assertion utilities.

```JavaScript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, matchSkewX, } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box-a")
const boxProjection = createNode(box, undefined, { layoutId: "a" })
boxProjection.willUpdate()
const newBox = document.createElement("div")
newBox.id = "box-b"
document.body.appendChild(newBox)
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", })
boxProjection.setValue("opacity", 0.8)
newBoxProjection.setValue("borderRadius", 20)
newBoxProjection.setValue("skewX", 40)
newBoxProjection.root.didUpdate()
frame.postRender(() => {
  const bbox = newBox.getBoundingClientRect()
  matchViewportBox(box, bbox)
  matchVisibility(box, "visible")
  matchVisibility(newBox, "visible")
  matchOpacity(box, 0.8)
  matchOpacity(newBox, 1)
  matchSkewX(box, 40)
  matchSkewX(newBox, 40)
  matchBorderRadius(box, "6.66667% / 5%")
  matchBorderRadius(newBox, "6.66667% / 5%")
})
```

--------------------------------