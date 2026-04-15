# Implement Framer Motion Optimized Appear Animation with React SSR and Hydration (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-opacity-waapi.html

This JavaScript code demonstrates how to integrate Framer Motion's `optimizedAppearAnimation` within a React application that uses server-side rendering (SSR) and client-side hydration. It defines a React component with a `motion.div` that animates its opacity, renders it to a string on the server, initiates an optimized appear animation directly on the DOM element, and then hydrates the React root mid-animation to ensure a seamless transition. A `useLayoutEffect` simulates a blocking operation, and an `onAnimationStart` callback includes a check for debugging the initial opacity value.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, } = window.Motion
const { matchOpacity } = window.Assert
const root = document.getElementById("root")
const duration = 0.5

// This is the tree to be rendered "server" and client-side.
const Component = React.createElement(() => {
  React.useLayoutEffect(() => {
    const startTime = performance.now()
    while (performance.now() - startTime < 100) {}
  })
  return React.createElement(motion.div, {
    id: "box",
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, ease: "linear" },
    /**
     * On animation start, check the values we expect to see here
     */
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
    [optimizedAppearDataAttribute]: "a",
  })
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
  },
  (animation) => {
    // Hydrate root mid-way through animation
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component)
    }, (duration * 1000) / 2)
  }
)
```

--------------------------------