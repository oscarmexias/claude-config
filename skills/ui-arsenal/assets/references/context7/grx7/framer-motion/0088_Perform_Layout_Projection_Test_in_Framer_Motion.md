# Perform Layout Projection Test in Framer Motion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-rotate-container.html

This example demonstrates how to use the projection engine to handle layout changes. It sets up a container and box, triggers a layout shift via CSS classes, and uses projection nodes to maintain or verify the visual state.

```css
body { padding: 0; margin: 0; } #container { width: 100px; height: 200px; display: flex; align-items: flex-end; } #container.b { align-items: flex-start; } #box { width: 100px; height: 100px; background-color: #00cc88; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

```javascript
const { createNode } = window.Undo
const { matchViewportBox } = window.Assert
const { frame } = window.Projection
const container = document.getElementById("container")
const containerProjection = createNode(container)
const box = document.getElementById("box")
const boxProjection = createNode(box, containerProjection)
containerProjection.setValue("rotate", 180)
requestAnimationFrame(() => {
  const boxOrigin = box.getBoundingClientRect()
  boxProjection.willUpdate()
  containerProjection.willUpdate()
  container.classList.add("b")
  requestAnimationFrame(() => {
    containerProjection.root.didUpdate()
    frame.postRender(() => {
      matchViewportBox(box, boxOrigin)
    })
  })
})
```

--------------------------------