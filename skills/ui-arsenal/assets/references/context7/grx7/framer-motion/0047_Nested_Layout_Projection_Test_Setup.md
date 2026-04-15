# Nested Layout Projection Test Setup

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-nested.html

Sets up a three-tier element hierarchy to test layout projection. It defines styles for the elements and uses JavaScript to initialize projection nodes, trigger a layout change, and assert the final position.

```css
body { padding: 0; margin: 0; }
#parent { position: relative; width: 200px; height: 200px; background-color: #00cc88; display: flex; align-items: center; justify-content: center; }
#mid { width: 50px; height: 50px; background-color: white; display: flex; align-items: center; justify-content: center; }
.b #mid { width: 100px; height: 100px; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

```javascript
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const parent = document.getElementById("parent")
const mid = document.getElementById("mid")
const child = document.getElementById("child")

const childOrigin = child.getBoundingClientRect()

const parentProjection = createNode(parent, undefined, {})
const midProjection = createNode(mid, parentProjection, {})
const childProjection = createNode(child, midProjection, {})

parentProjection.willUpdate()
midProjection.willUpdate()
childProjection.willUpdate()

parent.classList.add("b")
parentProjection.root.didUpdate()

frame.postRender(() => {
  frame.postRender(() => {
    matchViewportBox(child, childOrigin)
  })
})
```

--------------------------------