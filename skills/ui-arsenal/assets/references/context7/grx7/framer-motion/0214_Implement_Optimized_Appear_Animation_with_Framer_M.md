# Implement Optimized Appear Animation with Framer Motion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/resync-delay.html

This snippet demonstrates how to configure CSS and JavaScript for Framer Motion's optimized appear animations. It includes server-side rendering emulation, manual animation triggering before hydration, and the final React hydration step.

```css
body { padding: 100px; margin: 0; }
#box { width: 100px; height: 100px; background-color: #0077ff; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 1 !important; }
```

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue } = window.Motion;
const { matchViewportBox } = window.Assert;
const root = document.getElementById("root");
const delay = 0.25;
const duration = 0.5;
const x = motionValue(0);

x.on("change", (latest) => {
  if (latest < 100) {
    showError(document.getElementById("box"), "x transform should never be less than 100");
  }
});

const Component = React.createElement(() => {
  React.useLayoutEffect(() => {
    const startTime = performance.now();
    while (performance.now() - startTime < 500) {}
  });
  return React.createElement(motion.div, {
    id: "box",
    initial: { x: 0, opacity: 0 },
    animate: { x: 100, opacity: 1 },
    transition: { delay, duration, ease: "linear" },
    style: { x },
    [optimizedAppearDataAttribute]: "a"
  });
});

root.innerHTML = ReactDOMServer.renderToString(Component);

const options = { delay: delay * 1000, duration: duration * 1000, ease: "linear" };

startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
  options,
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, Component);
    }, duration * 1000);
  }
);

startOptimizedAppearAnimation(document.getElementById("box"), "opacity", [0, 1], options);
```

--------------------------------