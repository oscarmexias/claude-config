# Implement Framer Motion Optimized Appear Animations and Layout with React (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-sibling.html

This comprehensive JavaScript example, built with React, illustrates the use of Framer Motion for optimized appear animations and layout transitions. It defines a `Component` that renders two `motion.div` elements, one for optimized animations (opacity, background, transform) and another for layout changes. The snippet also demonstrates server-side rendering emulation with `ReactDOMServer.renderToString` and client-side hydration with `ReactDOM.hydrateRoot`, integrating `startOptimizedAppearAnimation` for various properties and including an `onAnimationComplete` callback for validation.

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
    setTimeout(() => {
      setTop(100)
    }, 250)
  }, [])

  return React.createElement("div", {
    id: "container",
    children: [
      React.createElement(motion.div, {
        id: "optimised-box",
        className: "box",
        initial: { x: 0, opacity: 0, backgroundColor: "#00f", },
        animate: { x: 100, opacity: 1, backgroundColor: "#00f", },
        transition: { duration, ease: "linear", },
        style: { x, position: "relative", },
        onAnimationComplete: () => {
          const box = document.getElementById("optimised-box")
          const color = window.getComputedStyle(box).backgroundColor
          if (color !== "rgb(255, 0, 0)") {
            console.log(color)
            showError(
              box,
              `optimised animations cancelled by sibling layout animations`
            )
          }
        },
        [optimizedAppearDataAttribute]: "a",
        children: "Content",
      }),
      React.createElement(motion.div, {
        id: "layout-box",
        className: "box",
        transition: {
          duration,
          ease: "linear",
          layout: { ease: () => 1, duration: 10 },
        },
        style: { top, position: "relative", background: top ? "red" : "blue", },
        layout: true,
        children: "Content",
      }),
    ],
  })
}

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(
  React.createElement(Component)
)

// Start optimised opacity animation
startOptimizedAppearAnimation(
  document.getElementById("optimised-box"),
  "opacity",
  [0, 1],
  { duration: duration * 1000, ease: "linear", }
)

// Start optimised background-color animation
// This optimised animation is red -> red whereas the animation on the
// motion.div is blue -> blue. Therefore, if the optimised animations
// cancelled, the rendered color will be blue.
startOptimizedAppearAnimation(
  document.getElementById("optimised-box"),
  "backgroundColor",
  ["#f00", "#f00"],
  { duration: duration * 1000, ease: "linear", }
)

// Start WAAPI animation
const animation = startOptimizedAppearAnimation(
  document.getElementById("optimised-box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
  { duration: duration * 1000, ease: "linear", },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(
        root,
        React.createElement(Component)
      )
    }, (duration * 1000) / 4)
  }
)
```

--------------------------------