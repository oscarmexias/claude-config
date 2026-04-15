# Initialize and Animate Projected Elements with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-remove.html

This JavaScript code snippet initializes and animates DOM elements using a projection library (likely Framer Motion). It creates projected nodes for existing and new elements, sets initial animation values like opacity and border-radius, and then unmounts the original element. A `postRender` callback asserts the final visual state of the animated element, checking viewport box, visibility, opacity, and border-radius.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box-a")
const boxProjection = createNode(box, undefined, { layoutId: "a" })
boxProjection.setValue("opacity", 0.8)
boxProjection.willUpdate()
const newBox = document.createElement("div")
newBox.id = "box-b"
document.body.appendChild(newBox)
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", })
newBoxProjection.setValue("borderRadius", 20)
boxProjection.unmount()
document.body.removeChild(box)
newBoxProjection.root.didUpdate()
frame.postRender(() => {
  const midBox = { bottom: 250, left: 50, right: 200, top: 50 }
  matchViewportBox(newBox, midBox)
  matchVisibility(newBox, "visible")
  /**
   * Should animate from the old opacity to the new one
   * IMPORTANT: Don't make the previous opacity something non-default
   */
  matchOpacity(newBox, 0.9)
  matchBorderRadius(newBox, "6.66667% / 5%")
})
```

--------------------------------