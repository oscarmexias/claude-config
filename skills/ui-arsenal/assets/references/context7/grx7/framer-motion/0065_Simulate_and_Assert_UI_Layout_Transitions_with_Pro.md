# Simulate and Assert UI Layout Transitions with Projection (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-with-child-block-update.html

This JavaScript code demonstrates a layout projection and assertion workflow. It initializes projection nodes for DOM elements, applies a CSS class to trigger a layout change, and then uses `matchViewportBox` to verify the new dimensions. The process involves blocking and unblocking projection updates, simulating a UI state transition, and asserting the visual outcome in a `postRender` callback.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const box = document.getElementById("box")
const boxProjection = createNode(box)
const child = document.getElementById("child")
const childProjection = createNode(child, boxProjection)

const boxOrigin = box.getBoundingClientRect()
const childOrigin = child.getBoundingClientRect()

boxProjection.root.blockUpdate()
boxProjection.willUpdate()
childProjection.willUpdate()

box.classList.add("b") // should unblock update
boxProjection.root.didUpdate()

frame.postRender(() => {
  const boxNewLayout = {
    bottom: 240,
    left: 200,
    right: 440,
    top: 100,
  }
  const childNewLayout = {
    bottom: 170,
    left: 220,
    right: 270,
    top: 120,
  }

  matchViewportBox(box, boxNewLayout)
  matchViewportBox(child, childNewLayout)

  boxProjection.willUpdate()
  childProjection.willUpdate()
  box.classList.remove("b")
  boxProjection.root.didUpdate()

  frame.postRender(() => {
    matchViewportBox(box, boxNewLayout)
    matchViewportBox(child, childNewLayout)
  })
})
```

--------------------------------