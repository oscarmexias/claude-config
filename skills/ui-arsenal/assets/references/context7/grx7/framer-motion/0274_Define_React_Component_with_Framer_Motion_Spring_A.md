# Define React Component with Framer Motion Spring Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-spring.html

Initializes Framer Motion and React dependencies, then defines a React component using `motion.div`. This component is configured with initial and animate properties for a spring-based `y` and `scale` animation. It includes an `onAnimationStart` check to validate the box's initial position and demonstrates server-side rendering of the component's initial state.

```javascript
const { motion, animateStyle, startOptimizedAppearAnimation, optimizedAppearDataAttribute, motionValue, spring, } = window.Motion
const { matchViewportBox, matchOpacity } = window.Assert
const root = document.getElementById("root")
const stiffness = 300
const damping = 40
const mass = 1

// This is the tree to be rendered "server" and client-side.
const Component = React.createElement(motion.div, {
  id: "box",
  initial: { y: 0, scale: 1 },
  animate: { y: 100, scale: 2 },
  transition: { type: "spring", stiffness, damping, mass },
  /**
   * On animation start, check the values we expect to see here
   */
  onAnimationStart: () => {
    const { top, left } = document
      .getElementById("box")
      .getBoundingClientRect()
    if (top < 110 || top > 140 || left < 60 || left > 90) {
      showError(box, `unexpected viewport box`)
    }
  },
  style: { willChange: "opacity" },
  \[optimizedAppearDataAttribute\]: "a",
})

// Emulate server rendering of element
root.innerHTML = ReactDOMServer.renderToString(Component)
```

--------------------------------