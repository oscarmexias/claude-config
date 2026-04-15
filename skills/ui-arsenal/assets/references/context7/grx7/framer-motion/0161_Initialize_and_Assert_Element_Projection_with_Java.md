# Initialize and Assert Element Projection with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-single-element.html

This JavaScript snippet demonstrates how to create and manage a projection node for an HTML element using `window.Animate` and `window.Assert` utilities. It retrieves an element by ID, creates a projection node, captures its initial bounding rectangle, updates its projection state, and then asserts its viewport box against the original dimensions. This is typically used in animation or layout testing scenarios to ensure elements are positioned correctly after transformations.

```javascript
const { createNode } = window.Animate
const { matchViewportBox } = window.Assert
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
boxProjection.root.didUpdate()
matchViewportBox(box, boxOrigin)
```

--------------------------------