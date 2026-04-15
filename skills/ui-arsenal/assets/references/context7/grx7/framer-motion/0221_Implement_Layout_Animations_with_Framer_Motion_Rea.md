# Implement Layout Animations with Framer Motion (React/JSX)

Source: https://context7.com/grx7/framer-motion/llms.txt

Demonstrates how to use the `layout` prop and `LayoutGroup` component in Framer Motion to automatically animate layout changes. It covers basic size/position animations, position-only animations, and shared layout transitions between elements using `layoutId` for a smooth user experience.

```jsx
import { motion, LayoutGroup } from "framer-motion"
import { useState } from "react"

function LayoutExample() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  return (
    <LayoutGroup>
      {/* Basic layout animation */}
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: isExpanded ? 300 : 100,
          height: isExpanded ? 200 : 100
        }}
      />

      {/* Position-only layout animation */}
      <motion.div layout="position">
        Size changes instantly, position animates
      </motion.div>

      {/* Shared layout animations */}
      <div className="grid">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            onClick={() => setSelectedId(item.id)}
          >
            <motion.h2 layoutId={`title-${item.id}`}>{item.title}</motion.h2>
          </motion.div>
        ))}
      </div>

      {/* Expanded card with shared layoutId */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="expanded-card"
          >
            <motion.h2 layoutId={`title-${selectedId}`}>
              {items.find(i => i.id === selectedId).title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Expanded content here
            </motion.p>
            <button onClick={() => setSelectedId(null)}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  )
}
```

--------------------------------