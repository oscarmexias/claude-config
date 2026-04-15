# Applying Value Transformations with Framer Motion's useTransform Hook in JSX

Source: https://context7.com/grx7/framer-motion/llms.txt

The `useTransform` hook creates a new MotionValue by transforming the output of one or more existing MotionValues. It supports various transformation types including range mapping, custom functions, combining multiple values, and applying easing functions. This is useful for linking animation properties to dynamic inputs like scroll position.

```jsx
import { motion, useMotionValue, useTransform } from "framer-motion"

function TransformExample() {
  const scrollY = useMotionValue(0)

  // Range mapping: input -> output
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])
  const opacity = useTransform(scrollY, [0, 200, 300], [1, 1, 0])

  // Custom transform function
  const rounded = useTransform(scrollY, (value) => Math.round(value))

  // Combine multiple MotionValues
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const distance = useTransform([x, y], ([latestX, latestY]) =>
    Math.sqrt(latestX ** 2 + latestY ** 2)
  )

  // Transform with easing
  const easedScale = useTransform(scrollY, [0, 300], [1, 2], {
    ease: [0.17, 0.67, 0.83, 0.67] // Cubic bezier
  })

  return (
    <motion.div
      style={{ scale, opacity }}
      onScroll={(e) => scrollY.set(e.currentTarget.scrollTop)}
    >
      <p>Distance from origin: {distance}</p>
      <motion.div drag style={{ x, y }} />
    </motion.div>
  )
}
```

--------------------------------