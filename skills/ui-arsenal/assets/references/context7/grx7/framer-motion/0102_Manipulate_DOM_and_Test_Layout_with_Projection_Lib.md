# Manipulate DOM and Test Layout with Projection Library in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/flexbox-siblings.html

This JavaScript code uses a custom 'Undo', 'Assert', and 'Projection' library (likely from Framer Motion or a similar context) to interact with DOM elements. It retrieves elements, creates 'projection' nodes for them, applies style changes (like 'borderRadius' and 'flexDirection'), and then asserts their viewport box, opacity, and border-radius after a render cycle. This pattern is common in testing or demonstrating layout and animation properties.

```javascript
const { createNode } = window.Undo
const { matchOpacity, matchBorderRadius, matchViewportBox } = window.Assert
const { frame } = window.Projection
const container = document.getElementById("container")
const a = document.getElementById("a")
const b = document.getElementById("b")
const aOrigin = a.getBoundingClientRect()
const bOrigin = b.getBoundingClientRect()
const aProjection = createNode(a)
const bProjection = createNode(b)
aProjection.setValue("borderRadius", 20)
aProjection.willUpdate()
bProjection.willUpdate()
container.style.flexDirection = "column-reverse"
aProjection.root.didUpdate()
frame.postRender(() => {
  matchViewportBox(a, aOrigin)
  matchViewportBox(b, bOrigin)
  matchOpacity(a, 1)
  matchOpacity(b, 1)
  matchBorderRadius(a, "13.3333% / 10%")
  matchBorderRadius(b, "")
})
```

--------------------------------