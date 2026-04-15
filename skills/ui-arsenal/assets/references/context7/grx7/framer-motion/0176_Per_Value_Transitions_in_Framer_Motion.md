# Per-Value Transitions in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Apply different transition configurations to individual animated properties. Each property (x, opacity, scale) can have independent animation types, durations, and physics parameters for fine-grained control.

```jsx
import { motion } from "framer-motion"

function TransitionExamples() {
  return (
    <motion.div
      animate={{ x: 100, opacity: 1, scale: 1.2 }}
      transition={{
        x: { type: "spring", stiffness: 300 },
        opacity: { duration: 0.2 },
        scale: { type: "spring", bounce: 0.5 }
      }}
    />
  )
}
```

--------------------------------