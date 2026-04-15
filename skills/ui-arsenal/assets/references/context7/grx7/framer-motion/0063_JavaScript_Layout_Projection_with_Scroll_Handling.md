# JavaScript Layout Projection with Scroll Handling

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-to-layout.html

Demonstrates creating projection nodes for a scrollable container and a child element. It handles layout updates when the container's scroll state or position changes, ensuring the viewport box remains consistent using post-render verification.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchOpacity, matchBorderRadius, addPageScroll, } = window.Assert
const { frame } = window.Projection

const scroll = document.getElementById("scroll")
const box = document.getElementById("box")
const boxOrigin = box.getBoundingClientRect()

scroll.scrollLeft = 50

const scrollProjection = createNode(scroll, undefined, { layoutScroll: true, })
const boxProjection = createNode(box, scrollProjection)

boxProjection.setValue("borderRadius", 20)
boxProjection.willUpdate()

scroll.classList.add("b")
boxProjection.root.didUpdate()

/**
 * Don't animate the box from its previous position if the scroll has changed.
 */
frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  matchOpacity(box, 1)
  matchBorderRadius(box, "20%")
})
```

--------------------------------