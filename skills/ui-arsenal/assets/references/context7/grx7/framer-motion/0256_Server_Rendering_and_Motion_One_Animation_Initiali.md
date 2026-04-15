# Server Rendering and Motion One Animation Initialization

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/portal.html

Renders the React component to a string on the server and initializes a Motion One animation on the client. The animation transforms the element from translateY(0px) scale(1) to translateY(100px) scale(2) with linear easing. This establishes the animation baseline before React hydration occurs.

```javascript
root.innerHTML = ReactDOMServer.renderToString(Component)

const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateY(0px) scale(1)", "translateY(100px) scale(2)"],
  {
    duration: duration * 1000,
    ease: "linear"
  },
  (animation) => {
    // Hydration callback
  }
)
```

--------------------------------