# Server Rendering and WAAPI Animation with Hydration

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-x.html

Implements server-side rendering of the React component followed by Web Animations API initialization. Starts a WAAPI animation with translateX transform and schedules client-side React hydration at the midpoint of the animation duration for seamless transition.

```javascript
const root = document.getElementById("root")
const duration = 0.5

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component)

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
      ReactDOM.hydrateRoot(root, Component)
    }, (duration * 1000) / 2)
  }
)
```

--------------------------------