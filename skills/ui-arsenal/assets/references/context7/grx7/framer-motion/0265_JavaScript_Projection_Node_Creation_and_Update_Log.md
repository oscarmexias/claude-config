# JavaScript Projection Node Creation and Update Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-instant.html

Initializes projection nodes for a hierarchy of DOM elements using the Framer Motion internal API. It handles the lifecycle of layout updates, including willUpdate and didUpdate calls, and asserts the final layout state after a render frame.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const parent = document.getElementById("parent")
const mid = document.getElementById("mid")
const child = document.getElementById("child")

const parentProjection = createNode(
  parent,
  undefined,
  {},
  { duration: 200, ease: relativeEase() }
)
const midProjection = createNode(
  mid,
  parentProjection,
  {},
  { duration: 200, ease: relativeEase() }
)
const childProjection = createNode(
  child,
  midProjection,
  {},
  { duration: 0 }
)

parentProjection.willUpdate()
midProjection.willUpdate()
childProjection.willUpdate()

parent.classList.add("b")
parentProjection.root.didUpdate()

frame.postRender(() => {
  frame.postRender(() => {
    matchViewportBox(mid, {
      bottom: 50,
      left: 50,
      right: 100,
      top: 0,
    })
    matchViewportBox(child, {
      bottom: 50,
      left: 50,
      right: 100,
      top: 0,
    })
  })
})
```

--------------------------------