# Server-Side Rendering and WAAPI Animation Initialization

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/resync.html

Renders the React component to HTML string using ReactDOMServer, then initiates Web Animations API animations for both transform and opacity properties. The transform animation translates from 0px to 100px, while opacity animates from 0 to 1. Both animations use linear easing and are synchronized with the component duration.

```javascript
root.innerHTML = ReactDOMServer.renderToString(Component)
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
  {
    duration: duration * 1000,
    ease: "linear",
  }
)
const opacityAnimation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear",
  },
  () => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component)
    }, (duration * 1000) / 2)
  }
)
```

--------------------------------