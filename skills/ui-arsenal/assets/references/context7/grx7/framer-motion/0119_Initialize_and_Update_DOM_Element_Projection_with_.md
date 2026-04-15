# Initialize and Update DOM Element Projection with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element.html

This JavaScript snippet demonstrates the initialization and update process for a DOM element's projection using custom `Undo` and `Assert` libraries. It retrieves an element by its ID, creates a projected node, captures its initial viewport dimensions, and then explicitly triggers update cycles for the projection and its root before performing a viewport box assertion.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
boxProjection.willUpdate()
boxProjection.root.didUpdate()
matchViewportBox(box, boxOrigin)
```

--------------------------------