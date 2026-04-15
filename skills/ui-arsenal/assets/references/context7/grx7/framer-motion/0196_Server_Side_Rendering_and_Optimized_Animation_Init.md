# Server-Side Rendering and Optimized Animation Initialization

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-uselayouteffect.html

Implements server-side rendering of the React component, then initiates optimized WAAPI animations for opacity and transform properties. Uses requestAnimationFrame callbacks to coordinate animation timing with React hydration, ensuring smooth transition from server-rendered HTML to interactive component.

```javascript
// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(
  React.createElement(Component)
)

// Start optimised opacity animation
startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear",
  }
)

// Start WAAPI animation
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
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
    }, (duration * 1000) / 2)
  }
)
```

--------------------------------