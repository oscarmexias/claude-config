# React Motion Component with Animation Lifecycle

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-transforms.html

Creates a React component using Framer Motion's motion.div that animates from y:0 to y:100 and scale 1 to 2. Includes onAnimationStart callback to validate viewport positioning and applies the optimized appear data attribute.

```javascript
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { y: 0, scale: 1 },
  animate: { y: 100, scale: 2 },
  transition: { duration, ease: "linear" },
  style: { y },
  onAnimationStart: () => {
    const { top, left } = document
      .getElementById("box")
      .getBoundingClientRect()
    if (top < 120 || top > 130 || left < 70 || left > 85) {
      showError(box, `unexpected viewport box`)
    }
  },
  [optimizedAppearDataAttribute]: "a"
})
```

--------------------------------