# Initialize Motion Values and Setup Validation Listeners

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/resync.html

Initializes Framer Motion utilities and creates a motion value for the x-axis transform. Sets up an onChange listener to validate that the x transform never drops below 50 pixels, triggering error display if validation fails. This ensures animation constraints are maintained throughout the animation lifecycle.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame, } = window.Motion
const { matchViewportBox } = window.Assert
const root = document.getElementById("root")
const duration = 1
const x = motionValue(0)
x.onChange((latest) => {
  if (latest < 50) {
    showError(
      document.getElementById("box"),
      `x transform should never be less than 50`
    )
  }
})
```

--------------------------------