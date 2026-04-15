# JavaScript Projection Node Setup and Layout Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/new-element-concurrent.html

Initializes projection nodes for layout animation tracking, creates and appends child elements to the DOM, manages render phases with willUpdate/didUpdate lifecycle methods, and synchronizes viewport boxes using frame post-render callbacks. Requires window.Undo, window.Assert, and window.Projection global objects.

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame, HTMLProjectionNode } = window.Projection
const box = document.getElementById("box")
const boxProjection = createNode(box)
const boxOrigin = box.getBoundingClientRect()
const a = document.createElement("div")
a.id = "child"
// Render phase
const aProjection = createNode( a, boxProjection, { layout: true }, "a" )
const bProjection = new HTMLProjectionNode({}, boxProjection)
// Snapshot
boxProjection.willUpdate()
// Commit
box.appendChild(a)
box.classList.add("b")
// First layout effect
boxProjection.root.didUpdate()
// A/B mounts
aProjection.mount(a)
frame.postRender(() => {
  matchViewportBox(box, boxOrigin)
  matchViewportBox(a, { bottom: 70, left: 20, right: 70, top: 20, })
})
```

--------------------------------