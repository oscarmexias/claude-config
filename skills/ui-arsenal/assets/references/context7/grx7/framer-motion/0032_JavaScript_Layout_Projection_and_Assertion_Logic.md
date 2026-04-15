# JavaScript Layout Projection and Assertion Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-single-element-layout-change-with-child.html

Demonstrates how to create projection nodes for DOM elements, trigger layout updates via class changes, and verify the resulting viewport boxes and styles using assertion utilities.

```javascript
const { createNode, relativeEase } = window.Animate
const { frame } = window.Projection
const { matchViewportBox, matchOpacity, matchBorderRadius } = window.Assert

const box = document.getElementById("box")
const boxProjection = createNode(
  box,
  undefined,
  {},
  { ease: relativeEase() }
)

const child = document.getElementById("child")
const childProjection = createNode(
  child,
  boxProjection,
  {},
  { ease: relativeEase() }
)

const boxOrigin = box.getBoundingClientRect()
const childOrigin = child.getBoundingClientRect()

childProjection.setValue("borderRadius", 20)
boxProjection.willUpdate()
childProjection.willUpdate()

box.classList.add("b")
boxProjection.root.didUpdate()

frame.postRender(() => {
  frame.postRender(() => {
    matchViewportBox(box, {
      top: 50,
      right: 270,
      bottom: 170,
      left: 100,
    })
    matchViewportBox(child, {
      top: 60,
      right: 160,
      bottom: 110,
      left: 110,
    })
    matchOpacity(box, 1)
    matchOpacity(child, 1)
    matchBorderRadius(box, 0)
    matchBorderRadius(child, "40%")
  })
})
```

--------------------------------