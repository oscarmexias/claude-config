# Initiate Framer Motion Optimized Appear Animation and Hydrate React

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-spring.html

This snippet initiates the optimized appear animation for the `box` element using the pre-calculated `transformKeyframes` and `transformOptions`. A callback function is provided to `startOptimizedAppearAnimation` which, after a short delay, hydrates the React root with the `Component`. This demonstrates how to smoothly transition from a server-rendered static state to a fully interactive client-side React application.

```javascript
// Start Motion One animations
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  transformKeyframes,
  transformOptions,
  (animation) => {
    // Hydrate root mid-way through animation
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component)
    }, 100)
  }
)
```

--------------------------------