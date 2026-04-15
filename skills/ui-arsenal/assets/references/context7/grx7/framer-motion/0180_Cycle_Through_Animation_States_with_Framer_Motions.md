# Cycle Through Animation States with Framer Motion's useCycle Hook (React/JSX)

Source: https://context7.com/grx7/framer-motion/llms.txt

Introduces the `useCycle` hook, a utility for cycling through a series of predefined values or animation variants, similar to `useState` but for sequential states. It shows how to use it for numeric values, object-based variants, and how to programmatically jump to specific states within the cycle.

```jsx
import { motion, useCycle } from "framer-motion"

function CycleExample() {
  // Cycle through values
  const [x, cycleX] = useCycle(0, 50, 100, 150)

  // Cycle through animation variants
  const [variant, cycleVariant] = useCycle("small", "medium", "large")

  const variants = {
    small: { scale: 0.5, borderRadius: "50%" },
    medium: { scale: 1, borderRadius: "10%" },
    large: { scale: 1.5, borderRadius: "0%" }
  }

  return (
    <>
      <motion.div animate={{ x }} onTap={() => cycleX()}>
        Click to move: {x}px
      </motion.div>

      <motion.div
        variants={variants}
        animate={variant}
        onTap={() => cycleVariant()}
      >
        Current: {variant}
      </motion.div>

      {/* Jump to specific index */}
      <button onClick={() => cycleVariant(0)}>Go to small</button>
      <button onClick={() => cycleVariant(2)}>Go to large</button>
    </>
  )
}
```

--------------------------------