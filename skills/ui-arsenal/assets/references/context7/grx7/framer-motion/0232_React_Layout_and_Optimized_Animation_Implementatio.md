# React Layout and Optimized Animation Implementation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-child.html

Implements a React component using Framer Motion to handle layout transitions and optimized appear animations. It includes server-side rendering emulation and hydration logic with a check for animation cancellation.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame } = window.Motion;
const { matchViewportBox, xTransformEquals } = window.Assert;
const root = document.getElementById("root");
const duration = 0.5;
const x = motionValue(0);
let isFirstFrame = true;

function Component() {
  const [top, setTop] = React.useState(0);
  React.useEffect(() => {
    setTimeout(() => {
      setTop(100);
    }, 100);
  }, []);

  return React.createElement(motion.div, {
    id: "container",
    className: "box",
    transition: {
      duration,
      ease: "linear",
      layout: { ease: () => 1, duration: 10 },
    },
    style: {
      top,
      position: "relative",
      background: top ? "red" : "blue",
    },
    layout: true,
    children: React.createElement(motion.div, {
      id: "optimised-box",
      className: "box",
      initial: { x: 0, opacity: 0, backgroundColor: "#f00" },
      animate: { x: 100, opacity: 1, backgroundColor: "#00f" },
      transition: { duration, ease: "linear" },
      style: { x, position: "relative" },
      onAnimationStart: () => {
        setTimeout(() => {
          const box = document.getElementById("optimised-box");
          if (
            box.style.opacity === window.getComputedStyle(box).opacity ||
            box.style.backgroundColor === window.getComputedStyle(box).backgroundColor ||
            xTransformEquals(box)
          ) {
            showError(box, "Optimised animations cancelled by ancestor layout animations");
          }
        }, 150);
      },
      [optimizedAppearDataAttribute]: "a",
      children: "Content",
    }),
  });
}

// Emulate server rendering
root.innerHTML = ReactDOMServer.renderToString(React.createElement(Component));

// Start optimized animations
startOptimizedAppearAnimation(document.getElementById("optimised-box"), "opacity", [0, 1], { duration: duration * 1000, ease: "linear" });
startOptimizedAppearAnimation(document.getElementById("optimised-box"), "backgroundColor", ["#f00", "#00f"], { duration: duration * 1000, ease: "linear" });

// Start WAAPI animation and hydrate
const animation = startOptimizedAppearAnimation(
  document.getElementById("optimised-box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
  { duration: duration * 1000, ease: "linear" },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, React.createElement(Component));
    }, (duration * 1000) / 4);
  }
);
```

--------------------------------