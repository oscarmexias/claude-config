# Framer Motion Projection and Animation for a Scrollable Box

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-layout-change.html

This JavaScript code demonstrates the use of Framer Motion's projection system to animate and assert the layout of an HTML element within a scrollable container. It initializes projection nodes for both the scroll container and the box, modifies the box's `borderRadius`, triggers a layout update, and then uses assertion functions (`matchViewportBox`, `matchOpacity`, `matchBorderRadius`) to verify the visual state after a render cycle. This setup is common for testing or implementing complex UI animations with accurate layout tracking.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchOpacity, matchBorderRadius, addPageScroll, } = window.Assert
const { frame } = window.Projection
const scroll = document.getElementById("scroll")
const box = document.getElementById("box")
scroll.scrollTop = 50
const boxOrigin = box.getBoundingClientRect()
const scrollProjection = createNode(scroll, undefined, { layoutScroll: true, })
const boxProjection = createNode(box, scrollProjection)
boxProjection.setValue("borderRadius", 20)
boxProjection.willUpdate()
box.classList.add("b")
boxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  matchOpacity(box, 1)
  matchBorderRadius(box, "20%")
})
```

--------------------------------