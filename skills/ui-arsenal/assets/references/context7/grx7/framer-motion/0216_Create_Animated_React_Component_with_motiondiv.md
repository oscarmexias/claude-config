# Create Animated React Component with motion.div

Source: https://context7.com/grx7/framer-motion/llms.txt

Demonstrates how to use the motion component as a drop-in replacement for HTML elements with animation props like initial, animate, exit, whileHover, and whileTap. Includes spring transitions and nested motion elements for complex animations.

```jsx
import { motion } from "framer-motion"

function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: 20,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      <motion.h2 animate={{ color: ["#000", "#333", "#000"] }}>
        Animated Card
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Hover and tap me!
      </motion.p>
    </motion.div>
  )
}
```

--------------------------------