# Motion Value Change Listener with Validation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-x.html

Sets up a motion value listener that validates animation progress constraints. Monitors the x-axis transform value to ensure it never drops below 50 and doesn't equal 100 on the first frame, triggering error callbacks if constraints are violated.

```javascript
const x = motionValue(0)
let isFirstFrame = true
x.onChange((latest) => {
  if (latest < 50) {
    showError(
      document.getElementById("box"),
      `x transform should never be less than 50`
    )
  }
  if (latest === 100 && isFirstFrame) {
    showError(
      document.getElementById("box"),
      `x transform shouldn't be 100 on the first frame`
    )
  }
  isFirstFrame = false
})
```

--------------------------------