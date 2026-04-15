# Manipulate Layout Nodes and Assert Viewport Boxes with Custom Libraries

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-transform-parents-animate-2.html

This JavaScript code initializes layout nodes using `window.Animate.createNode` and performs layout updates and assertions. It creates a new `div` element (`#b`), appends it to `#scroller`, and then uses `window.Assert.matchViewportBox` to verify the position and dimensions of element `#a` against both the newly created `#b`'s bounding client rect and a predefined set of coordinates. This demonstrates dynamic layout changes and programmatic testing of element positions using custom animation and assertion libraries.

```javascript
const { createNode } = window.Animate
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert
const { frame } = window.Projection
const a = document.getElementById("a")
const scroller = document.getElementById("scroller")
const aProjection = createNode(a, undefined, { layoutId: "a" })
const scrollerProjection = createNode(scroller)
scrollerProjection.setValue("x", -200)
frame.postRender(() => {
  aProjection.willUpdate()
  const b = document.createElement("div")
  b.id = "b"
  scroller.appendChild(b)
  const bProjection = createNode(b, scrollerProjection, { layoutId: "a", })
  aProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(a, b.getBoundingClientRect())
    matchViewportBox(a, { bottom: 350, height: 250, left: 55, right: 305, top: 100, width: 250, x: 55, y: 100, })
  })
})
```

--------------------------------