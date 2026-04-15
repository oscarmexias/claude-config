# Layout Projection and Viewport Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-with-child-layout-change.html

This implementation sets up a parent-child projection node relationship to handle layout transitions using Framer Motion's internal utilities. It depends on window-level Undo, Assert, and Projection modules to manage the lifecycle of DOM elements and verify their viewport positions. The logic captures initial bounding boxes and ensures that post-render states match the original layout despite class changes.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; }
#child.b { width: 100px; position: absolute; top: 150px; left: 250px; padding: 10px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
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

boxProjection.root.didUpdate()

frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(child, childOrigin)
})
```

--------------------------------