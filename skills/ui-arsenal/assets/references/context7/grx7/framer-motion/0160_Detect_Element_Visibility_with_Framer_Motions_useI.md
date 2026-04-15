# Detect Element Visibility with Framer Motion's useInView Hook (React/JSX)

Source: https://context7.com/grx7/framer-motion/llms.txt

Illustrates the `useInView` hook for detecting when a React element enters or leaves the viewport, leveraging IntersectionObserver. It shows how to configure options like `once`, `amount`, and `margin`, and also provides an alternative using the declarative `whileInView` prop for simpler in-view animations.

```jsx
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function InViewExample() {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,           // Only trigger once
    amount: 0.5,          // Trigger when 50% visible (or "some", "all")
    margin: "-100px 0px"  // Offset trigger area
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      I animate when scrolled into view!
    </motion.div>
  )
}

// Alternative: whileInView prop
function WhileInViewExample() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      Declarative in-view animation
    </motion.div>
  )
}
```

--------------------------------