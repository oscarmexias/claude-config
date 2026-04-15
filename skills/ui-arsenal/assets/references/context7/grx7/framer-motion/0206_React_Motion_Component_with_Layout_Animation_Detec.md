# React Motion Component with Layout Animation Detection

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-uselayouteffect.html

Creates a React functional component using Framer Motion that animates a box element with x-axis translation and opacity changes. Includes layout animation lifecycle hooks to detect conflicts between optimized animations and layout measurements, validating final positions.

```javascript
const { motion, animateStyle, animate, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, frame, } = window.Motion
const { matchViewportBox } = window.Assert
const root = document.getElementById("root")
const duration = 0.5
const x = motionValue(0)
let isFirstFrame = true

function Component() {
  const [top, setTop] = React.useState(0)
  React.useLayoutEffect(() => {
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
    style: {
      x,
      top,
      position: "relative",
      background: top ? "red" : "blue",
    },
    layout: true,
    onLayoutAnimationStart: () => {
      requestAnimationFrame(() => {
        const box = document.getElementById("box")
        const { top } = box.getBoundingClientRect()
        if (top !== 100) {
          showError(
            box,
            `layout animation overridden by optimised animation`
          )
        }
      })
    },
    onAnimationComplete: () => {
      const box = document.getElementById("box")
      const { left } = box.getBoundingClientRect()
      if (left !== 200) {
        showError(
          box,
          `optimised animation conflict with layout measurements`
        )
      }
    },
    [optimizedAppearDataAttribute]: "a",
    children: "Content",
  })
}
```

--------------------------------