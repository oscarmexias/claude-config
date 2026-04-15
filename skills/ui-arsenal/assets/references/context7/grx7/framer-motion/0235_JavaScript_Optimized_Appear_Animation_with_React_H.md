# JavaScript Optimized Appear Animation with React Hydration

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-delay-before.html

Demonstrates the use of startOptimizedAppearAnimation to synchronize server-rendered motion components with client-side hydration, including validation logic for initial animation states.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue } = window.Motion;
const { matchOpacity } = window.Assert;
const root = document.getElementById("root");
const duration = 0.25;
const delay = 0.5;
const opacity = motionValue(0);
let opacityHasChanged = false;

opacity.on("render", (v) => {
  if (!opacityHasChanged) {
    if (v > 0) {
      showError(document.getElementById("box"), `opacity should not start animating beyond 0 (started at ${v})`);
    }
  }
  opacityHasChanged = true;
});

const Component = React.createElement(motion.div, {
  id: "box",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, ease: "linear", delay },
  style: { opacity },
  onAnimationStart: () => {
    matchOpacity(document.getElementById("box"), 0);
    requestAnimationFrame(() => {
      matchOpacity(document.getElementById("box"), 0);
    });
  },
  [optimizedAppearDataAttribute]: "a",
});

root.innerHTML = ReactDOMServer.renderToString(Component);

startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  {
    duration: duration * 1000,
    ease: "linear",
    delay: delay * 1000,
  },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component);
      const { opacity: initialOpacity } = window.getComputedStyle(box);
      if (initialOpacity !== "0") {
        showError(box, "opacity should have animated");
      }
    }, 300);
  }
);
```

--------------------------------