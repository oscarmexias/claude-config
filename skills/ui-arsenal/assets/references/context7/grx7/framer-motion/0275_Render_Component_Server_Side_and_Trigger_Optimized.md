# Render Component Server-Side and Trigger Optimized Appear Animation (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/persist.html

This JavaScript snippet demonstrates the integration of server-side rendering (SSR) with framer-motion's optimized appear animation. It first renders the Component to an HTML string using ReactDOMServer.renderToString and injects it into the DOM. Subsequently, startOptimizedAppearAnimation is called to animate the element's opacity, followed by a setTimeout to perform client-side hydration using ReactDOM.hydrateRoot after the animation completes.

```javascript
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
    /**
     * Give it time to commit the finished animation
     */
    setTimeout(() => {
      // Hydrate root mid-way through animation
      ReactDOM.hydrateRoot(root, Component)
    }, duration * 1000 + 1000)
  }
)
```

--------------------------------