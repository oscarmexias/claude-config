# JavaScript Layout Projection and Assertion Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-block-update.html

Implements a test sequence using projection nodes to track DOM changes. It utilizes lifecycle methods like willUpdate and didUpdate to synchronize layout shifts and validates the resulting viewport boxes using assertion utilities.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()

boxProjection.root.blockUpdate()
boxProjection.willUpdate()
box.classList.add("b") // should unblock update
boxProjection.root.didUpdate()

frame.postRender(() => {
  const boxNewLayout = {
    left: 200,
    top: 100,
    right: 440,
    bottom: 240,
  }
  matchViewportBox(box, boxNewLayout)

  boxProjection.willUpdate()
  box.classList.remove("b")
  boxProjection.root.didUpdate()

  frame.postRender(() => {
    matchViewportBox(box, boxNewLayout)
  })
})
```

--------------------------------