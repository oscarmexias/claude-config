# Tween Animation with Easing in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Configure duration-based tween animations with preset easing, cubic bezier curves, or custom easing functions. Supports keyframe timing, delays, repeats, and repeat types for complex animation sequences.

```jsx
import { motion } from "framer-motion"

function TransitionExamples() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",           // Preset
        ease: [0.17, 0.67, 0.83, 0.67], // Cubic bezier
        ease: (t) => t * t,          // Custom function
        times: [0, 0.5, 1],          // Keyframe timing
        delay: 0.2,
        repeat: 3,                   // Number of repeats
        repeatType: "reverse",       // "loop" | "reverse" | "mirror"
        repeatDelay: 0.5
      }}
    />
  )
}
```

--------------------------------