# Initialize and Test Framer Motion Projections (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-to-static.html

This JavaScript code initializes Framer Motion projection nodes for `#fixed` and `#child` elements using `createNode` from `window.Undo`. It captures initial bounding boxes, simulates a page scroll, and dynamically changes the `position` and `justifyContent` of the `#fixed` element. Finally, it uses `matchViewportBox` from `window.Assert` to verify the elements' viewport positions after these layout changes, likely for testing Framer Motion's layout correction capabilities.

```javascript
const { createNode } = window.Undo
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll,
} = window.Assert
const { frame } = window.Projection
const fixed = document.getElementById("fixed")
const fixedProjection = createNode(fixed, undefined, { layoutScroll: true, layout: true,
})
const fixedOrigin = fixed.getBoundingClientRect()
const child = document.getElementById("child")
const childProjection = createNode(child, fixedProjection)
const childOrigin = child.getBoundingClientRect()
childProjection.willUpdate()
fixedProjection.willUpdate()
const scrollDistance = 100
window.scrollTo(scrollDistance, scrollDistance)
fixed.style.position = "static"
fixed.style.justifyContent = "flex-end"
fixedProjection.root.didUpdate()
setTimeout(() => {
  matchViewportBox(fixed, fixedOrigin)
  matchViewportBox(child, {
    top: 0,
    left: 0,
    right: 100,
    bottom: 100,
  })
}, 50)
```

--------------------------------