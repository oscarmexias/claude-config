# Optimized Appear Animation Implementation in React

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-ancestor.html

A React component and execution script that demonstrates optimized appear animations. It handles server-side rendering emulation via ReactDOMServer, triggers WAAPI animations, and validates style consistency during the hydration process.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame } = window.Motion;
const { matchViewportBox } = window.Assert;
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
    id: "optimised-box",
    className: "box",
    initial: { x: 0, opacity: 0, backgroundColor: "#00f" },
    animate: { x: 100, opacity: 1, backgroundColor: "#00f" },
    transition: { duration, ease: "linear" },
    style: { x, position: "relative" },
    onAnimationStart: () => {
      setTimeout(() => {
        const box = document.getElementById("optimised-box");
        if (box.style.opacity === window.getComputedStyle(box).opacity) {
          showError(box, "Optimised opacity animation cancelled by child layout animations");
        }
        if (box.style.backgroundColor === window.getComputedStyle(box).backgroundColor) {
          showError(box, "Optimised background-color animation cancelled by child layout animations");
        }
        if (!window.Assert.xTransformEquals(box)) {
          showError(box, "Optimised transform NOT animation cancelled by child layout animations");
        }
      }, 150);
    },
    [optimizedAppearDataAttribute]: "a",
    children: React.createElement(motion.div, {
      id: "layout-box",
      className: "box",
      transition: { duration, ease: "linear", layout: { ease: () => 1, duration: 10 } },
      style: { top, position: "relative", background: top ? "red" : "blue" },
      layout: true,
      children: "Content",
    }),
  });
}

// Emulate server rendering
root.innerHTML = ReactDOMServer.renderToString(React.createElement(Component));

// Start optimised animations
startOptimizedAppearAnimation(document.getElementById("optimised-box"), "opacity", [0, 1], { duration: duration * 1000, ease: "linear" });
startOptimizedAppearAnimation(document.getElementById("optimised-box"), "backgroundColor", ["#f00", "#f00"], { duration: duration * 1000, ease: "linear" });

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