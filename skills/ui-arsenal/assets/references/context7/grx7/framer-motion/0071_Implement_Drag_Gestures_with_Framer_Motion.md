# Implement Drag Gestures with Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Demonstrates how to enable drag functionality on elements using the drag prop. It covers axis locking, pixel-based constraints, elastic boundaries, and manual drag initiation using useDragControls.

```jsx
import { motion, useDragControls } from "framer-motion"
import { useRef } from "react"

function DragExample() {
  const constraintsRef = useRef(null)
  const dragControls = useDragControls()

  return (
    <div ref={constraintsRef} className="drag-area">
      {/* Basic drag */}
      <motion.div drag>Drag anywhere</motion.div>

      {/* Axis-locked drag */}
      <motion.div drag="x">Horizontal only</motion.div>

      {/* With constraints (pixels) */}
      <motion.div
        drag
        dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
        dragElastic={0.2}
        dragMomentum={true}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      >
        Constrained drag
      </motion.div>

      {/* Constrained to parent ref */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragSnapToOrigin
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        onDragStart={(event, info) => console.log("Start:", info.point)}
        onDrag={(event, info) => console.log("Delta:", info.delta)}
        onDragEnd={(event, info) => console.log("Velocity:", info.velocity)}
      >
        Snap back when released
      </motion.div>

      {/* Programmatic drag control */}
      <div
        onPointerDown={(e) => dragControls.start(e, { snapToCursor: true })}
        className="drag-handle"
      >
        Drag Handle
      </div>
      <motion.div
        drag="x"
        dragControls={dragControls}
        dragListener={false}
      >
        Controlled drag element
      </motion.div>
    </div>
  )
}
```

--------------------------------