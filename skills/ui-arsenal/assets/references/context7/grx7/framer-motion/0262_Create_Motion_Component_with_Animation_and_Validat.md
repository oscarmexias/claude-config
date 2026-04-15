# Create Motion Component with Animation and Validation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-opacity.html

Creates a React motion.div component with opacity animation from 0 to 1 over 0.5 seconds using linear easing. Includes onAnimationStart callback to validate initial opacity is between 0.4 and 0.6, and sets the optimized appear data attribute for server-side rendering coordination.

```javascript
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, ease: "linear" },
  style: { opacity },
  onAnimationStart: () => {
    const { opacity: initialOpacity } = window.getComputedStyle(box)
    const opacityAsNumber = parseFloat(initialOpacity)
    if (opacityAsNumber < 0.4 || opacityAsNumber > 0.6) {
      showError(
        box,
        `opacity should be roughly less than 0.5 at animation start`
      )
    }
  },
  [optimizedAppearDataAttribute]: "a"
})
```

--------------------------------