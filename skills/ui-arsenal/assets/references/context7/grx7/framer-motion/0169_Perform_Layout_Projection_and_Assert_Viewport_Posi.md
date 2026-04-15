# Perform Layout Projection and Assert Viewport Position with Framer Motion (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-with-child-layout-change-page-scroll.html

This JavaScript code demonstrates how to use Framer Motion's projection system to test element layout after DOM manipulation and page scrolling. It initializes projection nodes, applies CSS classes to trigger layout changes, scrolls the window, and then uses 'matchViewportBox' to assert that the projected positions of the 'box' and 'child' elements are correct relative to their original positions and the scroll offset.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, addPageScroll } = window.Assert
const { frame } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const child = document.getElementById("child")
const childProjection = createNode(child, boxProjection)
const boxOrigin = box.getBoundingClientRect()
const childOrigin = child.getBoundingClientRect()
boxProjection.willUpdate()
childProjection.willUpdate()
box.classList.add("b")
child.classList.add("b")
const scrollOffset = [50, 100]
window.scrollTo(...scrollOffset)
boxProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(box, addPageScroll(boxOrigin, ...scrollOffset))
  matchViewportBox(
    child, addPageScroll(childOrigin, ...scrollOffset)
  )
})
```

--------------------------------