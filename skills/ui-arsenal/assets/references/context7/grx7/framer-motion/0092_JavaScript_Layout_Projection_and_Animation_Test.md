# JavaScript Layout Projection and Animation Test

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-skip-parent.html

Implements a test case to verify if a child element correctly maintains its relative parent during a layout animation. It utilizes the createNode API to track element projections and asserts the final viewport box position.

```javascript
/**
 * This file tests whether, if the middle box finishes its animation correctly,
 * does the child correctly use the middle box instead of the parent box
 * as its relative parent.
 */
const { createNode, relativeEase } = window.Animate
const { matchViewportBox } = window.Assert
const { frame } = window.Projection

const parent = document.getElementById("parent")
const mid = document.getElementById("mid")
const child = document.getElementById("child")

const childOrigin = child.getBoundingClientRect()

const parentProjection = createNode(
    parent,
    undefined,
    { layoutScroll: true },
    { duration: 0.01 }
)

const midProjection = createNode(
    mid,
    parentProjection,
    {},
    { duration: 0.01, delay: 0 }
)

const childProjection = createNode(
    child,
    midProjection,
    {},
    { duration: 10, delay: 0.1 }
)

parentProjection.willUpdate()
midProjection.willUpdate()
childProjection.willUpdate()

parent.classList.add("b")
parentProjection.root.didUpdate()

setTimeout(() => {
    parentProjection.willUpdate()
    midProjection.willUpdate()
    childProjection.willUpdate()

    parent.classList.remove("b")
    parentProjection.root.didUpdate()

    frame.postRender(() => {
        matchViewportBox(child, childOrigin, 0.5)
    })
}, 150)
```

--------------------------------