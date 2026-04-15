# Initialize Layout Projections and Assert Box Positions (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-scroll-a-b-animate.html

This JavaScript code demonstrates the use of a projection library (likely Framer Motion) to manage layout. It initializes projection nodes for a scrollable screen and two box elements, simulates a scroll, and dynamically creates a new screen and box. Finally, it uses `setTimeout` to perform assertions on the viewport positions of the boxes, comparing measured and expected bounding box values.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection
const scrollScreen = document.querySelector(".screen")
const scrollScreenProjection = createNode(scrollScreen, undefined, { layoutScroll: true, })
scrollScreen.scrollTop = 1000
const box = document.getElementById("box")
const boxProjection = createNode(box, scrollScreenProjection, { layoutId: "box", })
boxProjection.willUpdate()
const screen = document.createElement("div")
screen.classList.add("screen")
document.body.appendChild(screen)
const screenProjection = createNode(screen, undefined)
const newBox = document.createElement("div")
newBox.id = "box-b"
screen.appendChild(newBox)
const newBoxProjection = createNode(newBox, screenProjection, { layoutId: "box", })
boxProjection.root.didUpdate()
setTimeout(() => {
  const measuredBox = box.getBoundingClientRect()
  matchViewportBox(box, measuredBox)
  matchViewportBox(newBox, measuredBox)
  const expected = { bottom: 480, height: 150, left: 50, right: 200, top: 330, width: 150, x: 50, y: 330, }
  matchViewportBox(box, expected)
}, 50)
```

--------------------------------