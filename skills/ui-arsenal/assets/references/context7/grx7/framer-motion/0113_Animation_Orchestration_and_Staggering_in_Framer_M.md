# Animation Orchestration and Staggering in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Coordinate multiple animations using delay, stagger, and timing controls. Configure when child animations start relative to parent animations, stagger direction, and orchestration timing for complex multi-element sequences.

```jsx
import { motion } from "framer-motion"

function TransitionExamples() {
  return (
    <motion.div
      animate={{ x: 100 }}
      transition={{
        delay: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: "beforeChildren"
      }}
    />
  )
}
```

--------------------------------