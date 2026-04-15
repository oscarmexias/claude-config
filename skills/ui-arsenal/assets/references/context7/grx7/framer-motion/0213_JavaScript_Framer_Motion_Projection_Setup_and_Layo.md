# JavaScript Framer Motion Projection Setup and Layout Update

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-mixed-transition.html

Initializes Framer Motion projection nodes for parent, mid, and child elements, establishing their hierarchical relationship. It then triggers a layout change by adding a class to the parent and forces a projection update, followed by assertions to match viewport boxes after rendering to verify the layout.

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
  { duration: 0 }
)
const midProjection = createNode(
  mid, 
  parentProjection, 
  {}, 
  { duration: 0 }
)
const childProjection = createNode(
  child, 
  midProjection, 
  {}, 
  { type: false }
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
      left: 100,
      right: 150,
      top: 0,
    })
    matchViewportBox(child, {
      bottom: 50,
      left: 100,
      right: 150,
      top: 0,
    })
  })
})
```

--------------------------------