# Framer Motion Projection Node Setup and Animation (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-needs-reset.html

This JavaScript code demonstrates the advanced usage of Framer Motion's internal `Projection` API to manage and animate layout changes. It initializes `ProjectionNode`s for existing and newly created DOM elements, establishing a parent-child hierarchy with `layoutId` and `crossfade` properties. The script then orchestrates layout updates, promotes nodes for animation, and uses `frame.postRender` to trigger and verify subsequent layout transitions, including class-based styling changes.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box-a")
const boxProjection = createNode(box, undefined, { layoutId: "a", crossfade: true, })
const mid = document.getElementById("mid-a")
const midProjection = createNode(mid, boxProjection, { layoutId: "container", crossfade: true, })
const child = document.getElementById("child-a")
const childProjection = createNode(child, midProjection, { layoutId: "b", crossfade: true, })
boxProjection.willUpdate()
midProjection.willUpdate()
childProjection.willUpdate()
// mount & promote B
const newBox = document.createElement("div")
newBox.id = "box-b"
document.body.appendChild(newBox)
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", crossfade: true, })
const newMid = document.createElement("div")
newMid.id = "mid-b"
newBox.appendChild(newMid)
const newMidProjection = createNode(newMid, newBoxProjection, { layoutId: "container", crossfade: true, })
const newChild = document.createElement("div")
newChild.id = "child-b"
newMid.appendChild(newChild)
const newChildProjection = createNode(newChild, newMidProjection, { layoutId: "b", crossfade: true, })
const newBoxOrigin = newBox.getBoundingClientRect()
const newChildOrigin = newChild.getBoundingClientRect()
newBoxProjection.root.didUpdate()
// promote A and skip layout updates
boxProjection.root.blockUpdate()
boxProjection.willUpdate()
midProjection.willUpdate()
childProjection.willUpdate()
newBoxProjection.willUpdate()
newMidProjection.willUpdate()
newChildProjection.willUpdate()
boxProjection.promote({ needsReset: true })
midProjection.promote({ needsReset: true })
childProjection.promote({ needsReset: true })
childProjection.root.didUpdate()
frame.postRender(() => {
// only update child layout
childProjection.willUpdate()
child.classList.add("moved")
childProjection.root.didUpdate()
frame.postRender(() => {
const midChildBox = { left: 0, right: 50, top: 75, bottom: 125, }
matchViewportBox(child, midChildBox)
})
})

```

--------------------------------