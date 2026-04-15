# JavaScript Reparenting Logic with Projection Nodes

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-transform-parents.html

Implements the logic to move a child element from one parent to another while using projection nodes to maintain visual consistency. It utilizes frame scheduling and assertion utilities to verify the layout state during the transition.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection

const a = document.getElementById("box-a")
const b = document.getElementById("box-b")
const child = document.querySelector(".child")

const aProjection = createNode(a)
const bProjection = createNode(b)
const childProjection = createNode(child, aProjection, {
  layoutId: "child",
})

aProjection.setValue("x", 100)
bProjection.setValue("x", -100)

frame.postRender(() => {
  aProjection.willUpdate()
  bProjection.willUpdate()
  childProjection.willUpdate()

  const childOrigin = child.getBoundingClientRect()
  const newChild = document.createElement("div")
  newChild.classList.add("child")
  b.appendChild(newChild)

  const newChildProjection = createNode(newChild, bProjection, {
    layoutId: "child",
  })

  newChildProjection.root.didUpdate()

  frame.postRender(() => {
    const newChildOrigin = newChild.getBoundingClientRect()
    matchViewportBox(child, childOrigin)
    matchViewportBox(newChild, childOrigin)
    matchOpacity(child, 1)
    matchOpacity(newChild, 0)
  })
})
```

--------------------------------