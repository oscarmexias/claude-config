# Track and Transform Values with useMotionValue Hook

Source: https://context7.com/grx7/framer-motion/llms.txt

Creates MotionValue objects that track state and velocity outside React's render cycle for optimal performance. Demonstrates value transformation, subscription to changes, and integration with drag gestures for interactive animations.

```jsx
import { motion, useMotionValue, useTransform } from "framer-motion"

function MotionValueExample() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0])
  const rotate = useTransform(x, [-200, 200], [-45, 45])
  const background = useTransform(
    x,
    [-200, 0, 200],
    ["#ff008c", "#7700ff", "#00d5ff"]
  )

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      console.log("x changed to:", latest)
    })
    return unsubscribe
  }, [x])

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      style={{ x, y, opacity, rotate, background }}
    >
      Drag me horizontally
    </motion.div>
  )
}
```

--------------------------------