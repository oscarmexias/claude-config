# Layout Projection and Viewport Assertion in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-with-child-rotate-animate.html

Initializes projection nodes for parent and child elements, applies a rotation value, and triggers a layout update by modifying class lists. It uses matchViewportBox to verify the final transformed positions of the elements after the projection cycle.

```javascript
const { createNode } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode( box, undefined, {}, { duration: 5, ease: () => 0.5 } )
const child = document.getElementById("child")
const childProjection = createNode( child, boxProjection, {}, { duration: 5, ease: () => 1 } )
boxProjection.setValue("rotate", 45)
requestAnimationFrame(() => {
  boxProjection.willUpdate()
  childProjection.willUpdate()
  box.classList.add("b")
  requestAnimationFrame(() => {
    boxProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(box, {
        bottom: 391.4213562011719,
        height: 282.84271240234375,
        left: 258.5786437988281,
        right: 541.42138671875,
        top: 108.57864379882812,
        width: 282.8427429199219,
      })
      matchViewportBox(child, {
        bottom: 285.3553466796875,
        height: 70.710693359375,
        left: 258.5786437988281,
        right: 329.289306640625,
        top: 214.6446533203125,
        width: 70.71066284179688,
      })
    })
  })
})
```

--------------------------------