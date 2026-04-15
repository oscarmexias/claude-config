# Unmount and Remount Components with Scroll Position Changes

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-remove.html

Simulates component lifecycle transitions by unmounting box-1, mounting box-2, changing scroll position, then remounting box-1. Validates that viewport box calculations correctly account for scroll offset changes during unmounted periods.

```javascript
scroll.scrollTop = 100

// unmount box-1, mount box-2
boxProjection.willUpdate()
boxProjection.unmount()
container.removeChild(box)

const box2 = document.createElement("div")
box2.id = "box-2"
container.appendChild(box2)

const box2Projection = createNode(box2, containerProjection, {
  layoutId: "b"
})

box2Projection.root.didUpdate()
matchViewportBox(box2, { top: 0, bottom: 100, left: 0, right: 100 })

// update the scroll while box-1 is unmounted
scroll.scrollTop = 50

// unmount box-2, mount box-1
box2Projection.willUpdate()
box2Projection.unmount()
container.removeChild(box2)

const box1 = document.createElement("div")
box1.id = "box-1"
container.appendChild(box1)

const box1Projection = createNode(box1, containerProjection, {
  layoutId: "a"
})

box1Projection.root.didUpdate()
matchViewportBox(box1, { top: 50, bottom: 150, left: 0, right: 100 })
```

--------------------------------