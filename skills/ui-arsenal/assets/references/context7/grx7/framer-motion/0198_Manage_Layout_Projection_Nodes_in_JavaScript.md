# Manage Layout Projection Nodes in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix.html

Demonstrates creating projection nodes for DOM elements and triggering layout updates. It uses the Animate and Assert utilities to verify layout transitions and visual properties like viewport boxes and border radii.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, } = window.Assert
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
newBoxProjection.root.didUpdate()

frame.postRender(() => {
  const midBox = { bottom: 250, left: 50, right: 200, top: 50 }
  matchViewportBox(box, midBox)
  matchViewportBox(newBox, midBox)
  matchVisibility(box, "visible")
  matchVisibility(newBox, "visible")
  matchOpacity(box, 0.8)
  matchOpacity(newBox, 1)
  matchBorderRadius(box, "6.66667% / 5%")
  matchBorderRadius(newBox, "6.66667% / 5%")
})
```

--------------------------------