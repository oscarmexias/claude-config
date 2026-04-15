# Manipulate Framer Motion Nodes and Assert Layout with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-relative-new-child.html

This JavaScript code demonstrates the creation and manipulation of Framer Motion `Projection` nodes for layout transitions. It initializes a node for `box-a`, then creates a new `box-b` and a `child` element, associating them with new projection nodes. The original `box-a` node is unmounted and removed, simulating a layout change, followed by assertions on the viewport box of the new elements.

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
const child = document.createElement("div")
child.id = "child"
newBox.appendChild(child)
const childProjection = createNode(child, newBoxProjection, { layoutId: "child", })
childProjection.willUpdate()
boxProjection.unmount()
document.body.removeChild(box)
newBoxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(newBox, { bottom: 400, left: 100, right: 400, top: 150, })
  matchViewportBox(child, { bottom: 210, left: 340, right: 390, top: 160, })
})
```

--------------------------------