# Initialize Framer Motion and Create Animated Component

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff.html

Extracts Motion API utilities from the window object and creates a React component with Framer Motion animations. The component animates x position and opacity over 2 seconds with linear easing, and includes animation start handlers to validate animation interruption.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame, } = window.Motion
const { matchViewportBox } = window.Assert
const root = document.getElementById("root")
const duration = 2
const x = motionValue(0)
let isFirstFrame = true

const Component = React.createElement(motion.div, {
  id: "box",
  initial: { x: 0, opacity: 0 },
  animate: { x: 100, opacity: 1 },
  transition: { duration, ease: "linear" },
  style: { x },
  [optimizedAppearDataAttribute]: "a",
  children: "Content",
})
```

--------------------------------