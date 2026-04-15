# Spring Animation Configuration in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Configure spring physics animations with stiffness, damping, mass, and velocity parameters. Spring animations provide natural, physics-based motion with customizable bounce and resistance characteristics.

```jsx
import { motion } from "framer-motion"

function TransitionExamples() {
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{
        type: "spring",
        stiffness: 100,    // Spring stiffness
        damping: 10,       // Resistance
        mass: 1,           // Virtual mass
        velocity: 50,      // Initial velocity
        restDelta: 0.01,   // Threshold to stop
        restSpeed: 0.01
      }}
    />
  )
}
```

--------------------------------