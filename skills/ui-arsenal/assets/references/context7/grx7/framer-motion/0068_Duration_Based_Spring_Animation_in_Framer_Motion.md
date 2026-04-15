# Duration-Based Spring Animation in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Create spring animations with approximate duration and bounce control. This approach simplifies spring configuration by specifying desired animation length and bounce intensity instead of individual physics parameters.

```jsx
import { motion } from "framer-motion"

function TransitionExamples() {
  return (
    <motion.div
      animate={{ scale: 2 }}
      transition={{
        type: "spring",
        duration: 0.8,     // Approximate duration
        bounce: 0.25       // 0 = no bounce, 1 = max bounce
      }}
    />
  )
}
```

--------------------------------