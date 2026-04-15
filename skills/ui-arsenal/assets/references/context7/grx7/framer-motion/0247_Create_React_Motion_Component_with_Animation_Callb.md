# Create React Motion Component with Animation Callbacks

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/resync.html

Defines a React functional component using Framer Motion's motion.div that animates from x:0, opacity:0 to x:100, opacity:1 over the specified duration. Includes a useLayoutEffect hook that blocks for 200ms to simulate server-side rendering delays, and onAnimationStart callback that validates opacity values post-render using frame scheduling.

```javascript
const Component = React.createElement(() => {
  React.useLayoutEffect(() => {
    const startTime = performance.now()
    while (performance.now() - startTime < 200) {}
  })
  return React.createElement(motion.div, {
    id: "box",
    initial: { x: 0, opacity: 0 },
    animate: { x: 100, opacity: 1 },
    transition: { duration, ease: "linear" },
    style: { x },
    onAnimationStart: () => {
      frame.postRender(() => {
        frame.postRender(() => {
          const box = document.getElementById("box")
          if (!box) return
          const { opacity } = window.getComputedStyle(box)
          if (parseFloat(opacity) < 0.65) {
            showError(
              box,
              "Resync failed with opacity: " + opacity
            )
          }
        })
      })
    },
    [optimizedAppearDataAttribute]: "a",
  })
})
```

--------------------------------