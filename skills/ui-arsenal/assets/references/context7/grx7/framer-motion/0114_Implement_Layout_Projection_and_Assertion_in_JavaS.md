# Implement Layout Projection and Assertion in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-rotate-layout.html

Uses the Animate and Projection APIs to create nodes, update layout states, and assert that the rendered output matches expected viewport boxes and rotations. It demonstrates manual lifecycle management of projection nodes including willUpdate and didUpdate calls.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, matchRotate, } = window.Assert
const { frame } = window.Projection

const parentA = document.getElementById("parent-a")
const parentAProjection = createNode(parentA, undefined, { layoutId: "parent", })

const childA = document.getElementById("child-a")
const childAProjection = createNode(childA, parentAProjection, { layoutId: "child", })

childAProjection.setValue("rotate", 45)
childAProjection.render()
childAProjection.willUpdate()
parentAProjection.willUpdate()

const parentB = document.createElement("div")
parentB.id = "parent-b"
parentB.classList.add("parent")
document.body.appendChild(parentB)

const parentBProjection = createNode(parentB, undefined, { layoutId: "parent", })
parentBProjection.setValue("rotate", 45)
parentBProjection.render()

const childB = document.createElement("div")
childB.id = "child-b"
childB.classList.add("child")
parentB.appendChild(childB)

const childBProjection = createNode(childB, parentBProjection, { layoutId: "child", })

childAProjection.root.didUpdate()

frame.postRender(() => {
  const parentBbox = parentB.getBoundingClientRect()
  matchViewportBox(parentA, parentBbox)
  const childBbox = childB.getBoundingClientRect()
  matchRotate(parentA, 22.5)
  matchRotate(childA, 22.5)
  matchRotate(parentB, 22.5)
  matchRotate(childB, 22.5)
})
```

--------------------------------