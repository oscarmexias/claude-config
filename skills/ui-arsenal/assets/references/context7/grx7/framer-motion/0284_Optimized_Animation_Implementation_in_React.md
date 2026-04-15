# Optimized Animation Implementation in React

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/start-after-hydration.html

Creates a motion component with initial and animate states, emulates server-side rendering via ReactDOMServer, and uses startOptimizedAppearAnimation to trigger WAAPI animations upon hydration.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue } = window.Motion;
const { matchViewportBox } = window.Assert;
const root = document.getElementById("root");
const duration = 1;

// This is the tree to be rendered server and client-side
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { x: 0, opacity: 0.5 },
  animate: { x: 100, opacity: 1 },
  transition: { duration, ease: "linear" },
  /**
   * On animation start, check the values we expect to see here
   */
  onAnimationStart: () => {
    setTimeout(() => {
      // Start WAAPI animation for transform
      startOptimizedAppearAnimation(
        document.getElementById("box"),
        "transform",
        ["translateX(0px)", "translateX(100px)"],
        { duration: duration * 1000, ease: "linear" }
      );
      // Start WAAPI animation for opacity
      startOptimizedAppearAnimation(
        document.getElementById("box"),
        "opacity",
        [0.5, 1],
        { duration: duration * 1000, ease: "linear" }
      );
      requestAnimationFrame(() => {
        const { top, left } = document.getElementById("box").getBoundingClientRect();
        // Validation logic for position
        if (left < 130) {
          showError(box, "unexpected viewport box");
        }
      });
    }, 500);
  },
  [optimizedAppearDataAttribute]: "a",
  children: "Content",
});

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component);
ReactDOM.hydrateRoot(root, Component);
```

--------------------------------