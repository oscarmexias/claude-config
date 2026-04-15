# React Motion Component with Animation Lifecycle

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-x.html

Creates a React component using Framer Motion's motion.div with initial and animate states. Includes onAnimationStart callback that validates viewport bounding box positioning with fuzzy tolerance for test runner compatibility. The component is configured for optimized appearance animation.

```javascript
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { x: 0 },
  animate: { x: 100 },
  transition: { duration, ease: "linear" },
  style: { x },
  onAnimationStart: () => {
    const { top, left } = document
      .getElementById("box")
      .getBoundingClientRect()
    if (left < 135 || left > 165) {
      showError(box, `unexpected viewport box`)
    }
  },
  [optimizedAppearDataAttribute]: "a",
  children: "Content",
})
```

--------------------------------