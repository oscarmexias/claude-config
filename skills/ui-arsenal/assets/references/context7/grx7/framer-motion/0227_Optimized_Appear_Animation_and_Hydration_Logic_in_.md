# Optimized Appear Animation and Hydration Logic in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-delay-before-accelerated.html

Simulates the lifecycle of a Framer Motion component from server-side rendering to client-side hydration. It uses startOptimizedAppearAnimation to trigger animations before React has fully loaded and verifies the opacity state during the hydration process.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, } = window.Motion
const { matchOpacity } = window.Assert
const root = document.getElementById("root")
const duration = 0.25
const delay = 0.5

// This is the tree to be rendered server and client-side.
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, ease: "linear", delay },
  /**
   * On animation start, check the values we expect to see here
   */
  onAnimationStart: () => {
    matchOpacity(document.getElementById("box"), 0)
    requestAnimationFrame(() => {
      matchOpacity(document.getElementById("box"), 0)
    })
  },
  [optimizedAppearDataAttribute]: "a",
})

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component)

startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear",
    delay: delay * 1000,
  },
  (animation) => {
    // Hydrate root mid-way through delay
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component)
      const { opacity: initialOpacity } = window.getComputedStyle(box)
      if (initialOpacity !== "0") {
        showError(box, "opacity should have animated")
      }
    }, 300)
  }
)
```

--------------------------------