# JavaScript Layout Projection and Assertion Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new.html

Implements layout projection using the Framer Motion API. It handles node creation with shared layout IDs, triggers updates, and uses assertion utilities to verify visibility and viewport positioning.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection

const box = document.getElementById("box-a")
const boxProjection = createNode(box, undefined, { layoutId: "a" })
const boxOrigin = box.getBoundingClientRect()

boxProjection.willUpdate()

const newBox = document.createElement("div")
newBox.id = "box-b"
document.body.appendChild(newBox)

const newBoxProjection = createNode(newBox, undefined, {
  layoutId: "a",
  crossfade: false,
})

newBoxProjection.root.didUpdate()

setTimeout(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(newBox, boxOrigin)
  matchVisibility(box, "hidden")
  matchVisibility(newBox, "visible")
  matchOpacity(newBox, 1)
}, 50)
```

--------------------------------