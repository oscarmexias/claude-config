# Framer Motion Projection Node Animation Sequence

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-nested-scale-correction.html

Orchestrates a multi-step layout animation using Framer Motion's projection system. Creates projection nodes for parent and child elements, manages animation lifecycle with willUpdate/didUpdate callbacks, and sequences class toggles with frame-based timing to animate layout changes while maintaining viewport box alignment.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const parent = document.getElementById("parent")
const a = document.getElementById("a")
const b = document.getElementById("b")

const parentProjection = createNode(
  parent,
  undefined,
  {},
  { duration: 0.1 }
)
const aProjection = createNode(
  a,
  parentProjection,
  {},
  { duration: 0.1 }
)
const bProjection = createNode(
  b,
  parentProjection,
  {},
  { duration: 0.1 }
)

const aOrigin = a.getBoundingClientRect()

parentProjection.willUpdate()
aProjection.willUpdate()
bProjection.willUpdate()
a.classList.add("open")
parentProjection.root.didUpdate()

frame.postRender(() => {
  frame.postRender(() => {
    parentProjection.willUpdate()
    aProjection.willUpdate()
    bProjection.willUpdate()
    a.classList.remove("open")
    parentProjection.root.didUpdate()
    setTimeout(() => {
      parentProjection.willUpdate()
      aProjection.willUpdate()
      bProjection.willUpdate()
      b.classList.add("open")
      parentProjection.root.didUpdate()
      frame.postRender(() => {
        frame.postRender(() => {
          matchViewportBox(a, aOrigin)
        })
      })
    }, 120)
  })
})
```

--------------------------------