# Implementing Physics-Based Animations with Framer Motion's useSpring Hook in JSX

Source: https://context7.com/grx7/framer-motion/llms.txt

The `useSpring` hook creates a MotionValue that animates to its target using realistic spring physics. It can be initialized with a static value or configured to smoothly follow another MotionValue, allowing for customizable stiffness, damping, and mass. This is ideal for creating natural, fluid UI interactions like cursor following or button press effects.

```jsx
import { motion, useMotionValue, useSpring } from "framer-motion"

function SpringExample() {
  const x = useMotionValue(0)

  // Smooth spring follower with custom physics
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
    mass: 1,
    restSpeed: 0.01,
    restDelta: 0.001
  })

  // Standalone spring value
  const scale = useSpring(1, { stiffness: 400, damping: 25 })

  return (
    <div onMouseMove={(e) => x.set(e.clientX)}>
      {/* Main cursor follows mouse instantly */}
      <motion.div
        style={{ x, position: "fixed", top: 100 }}
        className="cursor-main"
      />

      {/* Spring cursor follows with physics */}
      <motion.div
        style={{ x: springX, position: "fixed", top: 150 }}
        className="cursor-spring"
      />

      {/* Click to animate scale with spring */}
      <motion.button
        style={{ scale }}
        onTapStart={() => scale.set(0.9)}
        onTap={() => scale.set(1.1)}
        onTapCancel={() => scale.set(1)}
      >
        Spring Button
      </motion.button>
    </div>
  )
}
```

--------------------------------