# Create Reorderable Lists with Framer Motion Reorder

Source: https://context7.com/grx7/framer-motion/llms.txt

Shows how to build interactive, drag-to-reorder lists using Reorder.Group and Reorder.Item. This approach automatically handles layout transitions and state updates via the onReorder callback.

```jsx
import { Reorder, useDragControls } from "framer-motion"
import { useState } from "react"

function ReorderExample() {
  const [items, setItems] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" }
  ])

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      as="ul"
      layoutScroll
      style={{ overflow: "auto", maxHeight: 400 }}
    >
      {items.map((item) => (
        <ReorderItem key={item.id} item={item} />
      ))}
    </Reorder.Group>
  )
}

function ReorderItem({ item }) {
  const dragControls = useDragControls()

  return (
    <Reorder.Item
      value={item}
      as="li"
      dragListener={false}
      dragControls={dragControls}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileDrag={{
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        cursor: "grabbing"
      }}
      layout
    >
      <span
        onPointerDown={(e) => dragControls.start(e)}
        className="drag-handle"
      >
        ⋮⋮
      </span>
      <span>{item.text}</span>
    </Reorder.Item>
  )
}
```

--------------------------------