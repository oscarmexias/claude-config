# Measure and Validate Viewport Box Positioning

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-scroll-b-a-animate.html

Asynchronously measures the bounding client rectangle of DOM elements and validates their viewport positioning using assertion functions. Compares measured values against expected coordinates to ensure layout projections correctly handle element positioning across different scroll contexts.

```javascript
setTimeout(() => {
  const measuredBox = box.getBoundingClientRect()
  matchViewportBox(box, measuredBox)
  matchViewportBox(newBox, measuredBox)
  const expected = {
    bottom: 480,
    height: 150,
    left: 50,
    right: 200,
    top: 330,
    width: 150,
    x: 50,
    y: 330,
  }
  matchViewportBox(box, expected)
}, 50)
```

--------------------------------