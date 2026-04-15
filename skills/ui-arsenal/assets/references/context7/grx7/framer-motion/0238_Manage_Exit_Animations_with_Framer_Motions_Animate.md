# Manage Exit Animations with Framer Motion's `AnimatePresence` Component

Source: https://context7.com/grx7/framer-motion/llms.txt

The `AnimatePresence` component facilitates exit animations for React components when they are removed from the DOM tree. It wraps children and animates their `exit` prop, offering various `mode` options (e.g., `popLayout`, `wait`) to coordinate entering and exiting animations, and supports custom data for dynamic exit behaviors.

```jsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

function AnimatePresenceExample() {
  const [items, setItems] = useState([1, 2, 3])
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      {/* List with enter/exit animations */}
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            layout // Smooth layout shifts when siblings exit
          >
            Item {item}
            <button onClick={() => setItems(items.filter(i => i !== item))}>
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Wait mode: one exits completely before next enters */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          Page {selectedId}
        </motion.div>
      </AnimatePresence>

      {/* With custom exit data */}
      <AnimatePresence
        custom={direction}
        onExitComplete={() => console.log("All exits complete")}
      >
        {isVisible && (
          <motion.div
            custom={direction}
            variants={{
              enter: (dir) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir) => ({ x: dir < 0 ? 1000 : -1000, opacity: 0 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
          />
        )}
      </AnimatePresence>
    </>
  )
}
```

--------------------------------