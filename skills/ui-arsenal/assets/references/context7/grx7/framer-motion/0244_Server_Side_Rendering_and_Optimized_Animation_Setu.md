# Server-Side Rendering and Optimized Animation Setup

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff.html

Renders the React component to HTML string for server-side rendering, then initiates optimized opacity and transform animations using WAAPI. The opacity animation runs for the full duration while transform animation triggers React hydration at the midpoint.

```javascript
root.innerHTML = ReactDOMServer.renderToString(Component)

startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear",
  }
)

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