# Emulating Server-Side Rendering and Client-Side Hydration with Framer Motion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-opacity.html

This code block first emulates server-side rendering of the React component into the DOM using `ReactDOMServer.renderToString`. It then initiates a Framer Motion optimized appear animation using `startOptimizedAppearAnimation` for the `opacity` property. Finally, it performs client-side hydration of the React application after a delay, ensuring a smooth transition from the server-rendered content.

```javascript
// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(
  React.createElement(Component)
)

// Start WAAPI animation
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear",
  },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(
        root,
        React.createElement(Component)
      )
    }, (duration * 1000) / 4)
  }
)
```

--------------------------------