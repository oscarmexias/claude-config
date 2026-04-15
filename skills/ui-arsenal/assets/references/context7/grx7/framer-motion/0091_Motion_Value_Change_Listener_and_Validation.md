# Motion Value Change Listener and Validation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-transforms.html

Sets up a motion value listener that validates animation frame values during execution. It checks that the y transform never drops below 50 and that the first frame is not at 100, displaying errors if constraints are violated.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue } = window.Motion
const { matchViewportBox } = window.Assert
const root = document.getElementById("root")
const duration = 0.5
const y = motionValue(0)
let isFirstFrame = true

y.on("change", (latest) => {
  if (latest < 50) {
    showError(
      document.getElementById("box"),
      `y transform should never be less than 50, but was ${latest}`
    )
  }
  if (isFirstFrame && latest === 100) {
    showError(
      document.getElementById("box"),
      `y transform shouldn't be 100 on the first frame`
    )
  }
  isFirstFrame = false
})
```

--------------------------------