# Framer Motion Projection Node Creation and Property Assertion in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-rotate-scale-correction.html

This JavaScript snippet demonstrates how to initialize Framer Motion's `Projection` system, create `Node` instances for existing and newly created DOM elements, and associate them with `layoutId`s. It then sets animated values like opacity, border-radius, and rotation, and uses `frame.postRender` to assert the final visual state of the elements using `matchViewportBox`, `matchVisibility`, `matchOpacity`, `matchRotate`, and `matchBorderRadius`.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, matchRotate, } = window.Assert
const { frame } = window.Projection
const container = document.getElementById("container-a")
const containerProjection = createNode(container, undefined, { layoutId: "container", })
const box = document.getElementById("box-a")
const boxProjection = createNode(box, containerProjection, { layoutId: "box", })
containerProjection.willUpdate()
boxProjection.willUpdate()
const newContainer = document.createElement("div")
newContainer.id = "container-b"
document.body.appendChild(newContainer)
const newContainerProjection = createNode(newContainer, undefined, { layoutId: "container", })
const newBox = document.createElement("div")
newBox.id = "box-b"
newContainer.appendChild(newBox)
const newBoxProjection = createNode(
 newBox, newContainerProjection, { layoutId: "box" }
)
boxProjection.setValue("opacity", 0.8)
newBoxProjection.setValue("borderRadius", 20)
newBoxProjection.setValue("rotate", 40)
newBoxProjection.root.didUpdate()
frame.postRender(() => {
 const bbox = newBox.getBoundingClientRect()
 matchViewportBox(box, bbox)
 matchVisibility(box, "visible")
 matchVisibility(newBox, "visible")
 matchOpacity(box, 0.8)
 matchOpacity(newBox, 1)
 matchRotate(box, 20)
 matchRotate(newBox, 20)
 matchBorderRadius(box, "6.66667% / 5%")
 matchBorderRadius(newBox, "6.66667% / 5%")
})
```

--------------------------------