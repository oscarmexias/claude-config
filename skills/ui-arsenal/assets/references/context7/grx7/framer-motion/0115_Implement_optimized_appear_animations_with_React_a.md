# Implement optimized appear animations with React and Framer Motion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-useeffect.html

Demonstrates the use of Framer Motion's optimized appear animations (WAAPI) in a React environment. It covers server-side rendering emulation, hydration, and handling layout animation conflicts.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame, } = window.Motion
const { matchViewportBox } = window.Assert
const root = document.getElementById("root")
const duration = 0.5
const x = motionValue(0)
let isFirstFrame = true

function Component() {
  const [top, setTop] = React.useState(0)
  React.useEffect(() => {
    setTop(100)
  }, [])

  return React.createElement(motion.div, {
    id: "box",
    initial: { x: 0, opacity: 0 },
    animate: { x: 100, opacity: 1 },
    transition: {
      duration,
      ease: "linear",
      layout: { ease: () => 0, duration: 10 },
    },
    style: { x, top, position: "relative", background: top ? "red" : "blue", },
    layout: true,
    onLayoutAnimationStart: () => {
      requestAnimationFrame(() => {
        const box = document.getElementById("box")
        const { top } = box.getBoundingClientRect()
        if (top !== 100) {
          showError(box, "layout animation overridden by optimised animation")
        }
      })
    },
    onAnimationComplete: () => {
      const box = document.getElementById("box")
      const { left } = box.getBoundingClientRect()
      if (left !== 200) {
        showError(box, "optimised animation conflict with layout measurements")
      }
    },
    [optimizedAppearDataAttribute]: "a",
    children: "Content",
  })
}

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(React.createElement(Component))

// Start optimised opacity animation
startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  { duration: duration * 1000, ease: "linear" }
)

// Start WAAPI animation
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
  { duration: duration * 1000, ease: "linear" },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(root, React.createElement(Component))
    }, (duration * 1000) / 2)
  }
)
```

--------------------------------