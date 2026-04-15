# Tracking Scroll Progress with Framer Motion's useScroll Hook in JSX

Source: https://context7.com/grx7/framer-motion/llms.txt

The `useScroll` hook provides MotionValues that track the scroll progress of the viewport or a specific container element. It can monitor overall scroll position, progress within a container, or an element's visibility relative to the viewport. This enables dynamic animations and UI changes based on scroll events, such as progress bars or elements changing style as they enter the view.

```jsx
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

function ScrollExample() {
  const containerRef = useRef(null)
  const targetRef = useRef(null)

  // Track viewport scroll
  const { scrollY, scrollYProgress } = useScroll()

  // Track scroll within a container
  const { scrollXProgress: containerProgress } = useScroll({
    container: containerRef
  })

  // Track element position relative to viewport
  const { scrollYProgress: elementProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"] // When element enters/exits viewport
  })

  // Transform scroll progress to visual properties
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const backgroundColor = useTransform(
    elementProgress,
    [0, 0.5, 1],
    ["#ff0000", "#00ff00", "#0000ff"]
  )

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500"
      />

      {/* SVG path animation */}
      <svg viewBox="0 0 100 100">
        <motion.circle
          cx="50" cy="50" r="40"
          stroke="#000"
          strokeWidth="2"
          fill="none"
          style={{ pathLength }}
        />
      </svg>

      {/* Element that changes based on its scroll position */}
      <motion.div ref={targetRef} style={{ backgroundColor }}>
        Watch me change color as I scroll!
      </motion.div>
    </>
  )
}
```

--------------------------------