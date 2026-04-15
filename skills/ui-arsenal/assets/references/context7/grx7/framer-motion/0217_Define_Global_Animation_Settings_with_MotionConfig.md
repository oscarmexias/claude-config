# Define Global Animation Settings with MotionConfig in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Apply universal configuration options, such as default transitions and reduced motion settings, to all child motion components using MotionConfig. This allows for consistent animation behavior across an application while still permitting individual component overrides.

```jsx
import { motion, MotionConfig } from "framer-motion"

function MotionConfigExample() {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      reducedMotion="user" // "user" | "always" | "never"
    >
      {/* All children use spring transition by default */}
      <motion.div animate={{ x: 100 }}>Spring animated</motion.div>
      <motion.div animate={{ scale: 1.5 }}>Also spring</motion.div>

      {/* Override per-component */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ type: "tween", duration: 2 }}
      >
        Tween override
      </motion.div>
    </MotionConfig>
  )
}
```

--------------------------------