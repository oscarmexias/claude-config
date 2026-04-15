# React Component with Framer Motion Layout and Optimized Appear Animations

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-opacity.html

This React functional component uses Framer Motion's `motion.div` to create an animatable box. It demonstrates `initial`, `animate`, and `transition` properties, `motionValue` for X-axis animation, and `useState` for Y-axis. The `layout` prop enables layout animations, and `onLayoutAnimationStart` includes a check to detect potential issues with optimized opacity animations being overridden by layout animations.

```javascript
function Component() {
  const [top, setTop] = React.useState(0)
  React.useEffect(() => {
    setTimeout(() => {
      setTop(100)
    }, 250)
  }, [])
  return React.createElement(motion.div, {
    id: "box",
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration, ease: "linear", layout: { duration: 10 }, },
    style: { x, top, position: "relative", background: top ? "red" : "blue", },
    layout: true,
    onLayoutAnimationStart: () => {
      requestAnimationFrame(() => {
        const box = document.getElementById("box")
        if ( box.style.opacity === window.getComputedStyle(box).opacity ) {
          /**
           * If style.opacity and computed style.opacity are the same,
           * it means the optimised opacity animation was cancelled by
           * the layout animation.
           */
          showError(
            "style attr and computed style should be slightly different"
          )
        }
      })
    },
    [optimizedAppearDataAttribute]: "a",
    children: "Content",
  })
}
```

--------------------------------