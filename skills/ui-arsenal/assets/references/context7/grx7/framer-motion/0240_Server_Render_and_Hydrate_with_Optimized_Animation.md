# Server Render and Hydrate with Optimized Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-tween-opacity.html

Renders the motion component to HTML string on the server, then starts an optimized appearance animation on the box element. Hydrates the React root mid-way through the animation (at 250ms for a 500ms duration) to synchronize server-rendered content with client-side interactivity.

```javascript
root.innerHTML = ReactDOMServer.renderToString(Component)
startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear"
  },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component)
    }, (duration * 1000) / 2)
  }
)
```

--------------------------------