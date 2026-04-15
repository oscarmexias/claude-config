# Animate visibility in a React component

Source: https://github.com/grx7/framer-motion/blob/main/packages/framer-motion/README.md

Demonstrates how to import the motion component and use it within a functional React component to animate opacity based on a prop.

```jsx
import { motion } from "framer-motion"

export const MyComponent = ({ isVisible }) => (
    <motion.div animate={{ opacity: isVisible ? 1 : 0 }} />
)
```

--------------------------------