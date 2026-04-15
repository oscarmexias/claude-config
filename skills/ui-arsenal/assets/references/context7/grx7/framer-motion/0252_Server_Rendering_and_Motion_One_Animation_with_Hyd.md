# Server Rendering and Motion One Animation with Hydration

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-transforms.html

Implements server-side rendering of the React component, starts a Motion One animation with transform keyframes, and performs client-side hydration mid-way through the animation. The animation runs for the specified duration with linear easing.

```javascript
// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component)

// Start Motion One animation
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateY(0px) scale(1)", "translateY(100px) scale(2)"],
  {
    duration: duration * 1000,
    ease: "linear"
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