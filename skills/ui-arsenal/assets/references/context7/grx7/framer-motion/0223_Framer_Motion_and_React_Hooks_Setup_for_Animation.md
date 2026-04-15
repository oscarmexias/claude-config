# Framer Motion and React Hooks Setup for Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-opacity.html

This JavaScript block initializes Framer Motion utilities and React hooks. It destructures key functions and components from `window.Motion`, sets up a `motionValue` for animation, and defines global constants. This setup prepares the environment for creating interactive and animated UI elements using Framer Motion within a React application.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame, } = window.Motion
const { matchViewportBox } = window.Assert
const root = document.getElementById("root")
const duration = 0.5
const x = motionValue(0)
let isFirstFrame = true
```

--------------------------------