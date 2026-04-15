# Imperative Scoped Animations with useAnimate Hook

Source: https://context7.com/grx7/framer-motion/llms.txt

Explains how to use the useAnimate hook for manual animation control within a specific scope. It supports complex sequences, parallel animations, and timeline manipulation like speed and time jumping.

```jsx
import { useAnimate, stagger } from "framer-motion"

function UseAnimateExample() {
  const [scope, animate] = useAnimate()

  async function handleClick() {
    // Animate elements within scope
    await animate("li", { opacity: 1, x: 0 }, { delay: stagger(0.1) })
    await animate(".title", { scale: [1, 1.2, 1] }, { duration: 0.3 })

    // Chain animations
    animate(scope.current, { backgroundColor: "#ff0000" })
  }

  async function complexSequence() {
    // Parallel animations
    await Promise.all([
      animate(".box-1", { x: 100 }),
      animate(".box-2", { y: 100 })
    ])

    // Sequential with timeline control
    const controls = animate(".result", { opacity: 1 })
    controls.time = 0.5  // Jump to middle
    controls.speed = 2   // Double speed
    await controls       // Wait for completion
  }

  return (
    <div ref={scope}>
      <h1 className="title">Animated Content</h1>
      <ul>
        <li style={{ opacity: 0, x: -20 }}>Item 1</li>
        <li style={{ opacity: 0, x: -20 }}>Item 2</li>
        <li style={{ opacity: 0, x: -20 }}>Item 3</li>
      </ul>
      <button onClick={handleClick}>Animate</button>
    </div>
  )
}
```

--------------------------------