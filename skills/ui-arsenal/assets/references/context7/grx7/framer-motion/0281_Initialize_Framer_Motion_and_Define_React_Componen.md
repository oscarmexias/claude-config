# Initialize Framer Motion and Define React Component with Animation Properties (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/persist.html

This JavaScript code initializes framer-motion utilities and defines a React functional component (motion.div) that will be animated. It sets up initial and animate opacity states, a linear transition, and a motionValue to track opacity, including an onChange handler for validation. An onAnimationStart callback is used to log and assert the computed style at the animation's beginning.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, } = window.Motion
const { matchOpacity } = window.Assert
const root = document.getElementById("root")
const duration = 0.5
const opacity = motionValue(0)
opacity.onChange((v) => {
  if (v < 1) {
    showError(
      document.getElementById("box"),
      "opacity should never be less than 1"
    )
  }
})
// This is the tree to be rendered "server" and client-side.
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, ease: "linear" },
  style: { opacity },
  /**
   * On animation start, check the values we expect to see here
   */
  onAnimationStart: () => {
    console.log(
      getComputedStyle(document.getElementById("box")).opacity
    )
    matchOpacity(document.getElementById("box"), 1)
  },
  [optimizedAppearDataAttribute]: "a",
})
```

--------------------------------