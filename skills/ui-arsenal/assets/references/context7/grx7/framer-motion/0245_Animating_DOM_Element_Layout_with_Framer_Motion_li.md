# Animating DOM Element Layout with Framer Motion-like Projection in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-interrupt.html

This JavaScript code demonstrates how to animate the layout of DOM elements (`#parent` and `#child`) using a projection-based animation library, likely similar to Framer Motion. It initializes projection nodes for both elements, applies a CSS class to trigger a layout change, and then uses `matchViewportBox` within `frame.postRender` callbacks to assert and animate the elements' positions and sizes through several states. The `willUpdate` and `didUpdate` methods manage the animation lifecycle.

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const child = document.getElementById("child")
const parentOrigin = parent.getBoundingClientRect()
const childOrigin = child.getBoundingClientRect()
const parentProjection = createNode(
  parent, undefined, {}, { duration: 1000, ease: relativeEase() }
)
const childProjection = createNode(
  child, parentProjection, {}, { duration: 200, ease: relativeEase() }
)
parentProjection.willUpdate()
childProjection.willUpdate()
parent.classList.add("b")
parentProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(parent, parentOrigin)
  matchViewportBox(child, childOrigin)
  frame.postRender(() => {
    matchViewportBox(parent, {
      top: 50, bottom: 170, left: 100, right: 270,
    })
    matchViewportBox(child, {
      top: 60, bottom: 135, left: 160, right: 235,
    })
    parentProjection.willUpdate()
    childProjection.willUpdate()
    parent.classList.remove("b")
    parentProjection.root.didUpdate()
    frame.postRender(() => {
      frame.postRender(() => {
        matchViewportBox(parent, {
          top: 25, bottom: 135, height: 110, left: 50, right: 185,
        })
        matchViewportBox(child, {
          top: 30, bottom: 92.5, height: 62.5, left: 80, right: 142.5,
        })
      })
    })
  })
})
```

--------------------------------