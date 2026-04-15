# Define Orchestrated Animations using Framer Motion Variants

Source: https://context7.com/grx7/framer-motion/llms.txt

Variants in Framer Motion allow for defining reusable animation states that can be referenced by name, simplifying complex animation sequences. They enable orchestrated animations across component trees, supporting features like staggered children, delayed animations, and dynamic values for highly customizable and maintainable animation logic.

```jsx
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1, // 1 = first to last, -1 = last to first
      when: "beforeChildren" // or "afterChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  exit: { y: -20, opacity: 0 }
}

// Dynamic variants with custom prop
const dynamicVariants = {
  hidden: (custom) => ({
    opacity: 0,
    x: custom.direction * 100
  }),
  visible: {
    opacity: 1,
    x: 0
  }
}

function VariantsExample({ items }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          variants={itemVariants}
          custom={{ direction: i % 2 === 0 ? 1 : -1 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

--------------------------------