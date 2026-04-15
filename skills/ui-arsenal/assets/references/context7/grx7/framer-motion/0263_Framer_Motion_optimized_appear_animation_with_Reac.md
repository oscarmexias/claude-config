# Framer Motion optimized appear animation with React SSR and hydration

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-delay-after.html

This JavaScript code demonstrates an optimized appear animation using Framer Motion within a React application. It sets up a `motionValue` for opacity with validation listeners, defines a `motion.div` component, and performs server-side rendering. The snippet then initiates an optimized appear animation and hydrates the root client-side mid-animation to ensure a smooth transition and validate initial opacity.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, } = window.Motion
const { matchOpacity } = window.Assert
const root = document.getElementById("root")
const duration = 0.5
const opacity = motionValue(0)
let opacityHasChanged = false
opacity.on("render", (v) => {
  if (!opacityHasChanged) {
    if (v > 0.6) {
      showError(
        document.getElementById("box"),
        `opacity should not start animating beyond 0.6 (started at ${v})`
      )
    }
  }
  opacityHasChanged = true
  if (v < 0.5) {
    showError(
      document.getElementById("box"),
      "opacity should never be less than 0.25"
    )
  }
})
// This is the tree to be rendered "server" and client-side.
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, ease: "linear", delay: 0.25 },
  style: { opacity },
  \[optimizedAppearDataAttribute\]: "a",
})
// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component)
const box = document.getElementById("box")
function checkOpacity() {}
startOptimizedAppearAnimation(
  box,
  "opacity",
  \[0, 1\],
  {
    duration: duration * 1000,
    ease: "linear",
    delay: 250,
  },
  (animation) => {
    // Hydrate root mid-way through animation
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component)
      const { opacity: initialOpacity } = window.getComputedStyle(box)
      if (initialOpacity === "0") {
        showError(box, `opacity should have animated`)
      }
    }, 500)
  }
)
```

--------------------------------