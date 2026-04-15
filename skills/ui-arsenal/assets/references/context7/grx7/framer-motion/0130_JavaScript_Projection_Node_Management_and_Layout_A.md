# JavaScript Projection Node Management and Layout Assertion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-parent-delayed.html

Initializes projection nodes for DOM elements and triggers layout updates when classes change. It utilizes post-render hooks to perform assertions on the final viewport boxes of the elements.

```javascript
const { createNode } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const parent = document.getElementById("parent")
const child = document.getElementById("child")
const parentOrigin = parent.getBoundingClientRect()

const parentProjection = createNode( parent, undefined, {}, { delay: 1000 } )
const childProjection = createNode(child, parentProjection)

parentProjection.willUpdate()
childProjection.willUpdate()

parent.classList.add("b")
parentProjection.root.didUpdate()

frame.postRender(() => {
  frame.postRender(() => {
    matchViewportBox(parent, parentOrigin)
    matchViewportBox(child, {
      bottom: 85,
      height: 75,
      left: 60,
      right: 135,
      top: 10,
      width: 75,
      x: 60,
    })
  })
})
```

--------------------------------