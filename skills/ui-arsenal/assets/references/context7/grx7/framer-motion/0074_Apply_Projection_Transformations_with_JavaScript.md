# Apply Projection Transformations with JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-nested-parent-layout-change-scale-child-layout-change-transform.html

This JavaScript code utilizes a projection library to create and manipulate projected nodes for 'parent' and 'child' HTML elements. It applies scale and position transformations to these projected nodes. The script then updates the layout by adding a class to the parent and verifies the viewport box positions of both elements after the update.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const parent = document.getElementById("parent")
const child = document.getElementById("child")
const parentProjection = createNode(parent)
const childProjection = createNode(child, parentProjection)
parentProjection.setValue("scale", 2)
parentProjection.setValue("x", 400)
childProjection.setValue("scale", 0.5)
childProjection.setValue("x", -100)
frame.postRender(() => {
  const parentOrigin = parent.getBoundingClientRect()
  const childOrigin = child.getBoundingClientRect()
  parentProjection.willUpdate()
  childProjection.willUpdate()
  parent.classList.add("b")
  childProjection.root.didUpdate()
  frame.postRender(() => {
    matchViewportBox(parent, parentOrigin)
    matchViewportBox(child, childOrigin)
  })
})
```

--------------------------------