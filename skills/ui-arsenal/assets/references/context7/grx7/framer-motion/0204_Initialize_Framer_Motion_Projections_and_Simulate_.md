# Initialize Framer Motion Projections and Simulate Scroll/Scale

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-element-scroll-scale.html

This JavaScript code initializes Framer Motion's projection system for several DOM elements. It creates projection nodes for a scroll container, a box, and a button, establishing parent-child relationships. The code then simulates scrolling, scales the box, and uses `requestAnimationFrame` to update and assert the layout, demonstrating how Framer Motion handles layout and scroll transformations.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const scroll = document.getElementById("scroll")
const scrollProjection = createNode(scroll, undefined, { layoutScroll: true, })
const box = document.getElementById("box")
const boxProjection = createNode(box, scrollProjection)
const button = document.getElementById("button")
const buttonProjection = createNode(button, boxProjection)
const scrollDistance = 100
scroll.scrollTop = scrollDistance
scroll.scrollLeft = scrollDistance
boxProjection.setValue("scale", 2)
boxProjection.options.visualElement.render()
const boxOrigin = box.getBoundingClientRect()
const buttonOrigin = button.getBoundingClientRect()
requestAnimationFrame(() => {
  buttonProjection.willUpdate()
  boxProjection.willUpdate()
  boxProjection.root.didUpdate()
  matchViewportBox(box, boxOrigin)
  matchViewportBox(button, buttonOrigin)
})
```

--------------------------------