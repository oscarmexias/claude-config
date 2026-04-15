# Imperative Animation Control with animate() Function

Source: https://context7.com/grx7/framer-motion/llms.txt

Provides imperative control over animations outside React's render cycle for DOM elements, CSS selectors, and values. Supports stagger effects, animation sequences with timing control, and playback manipulation including pause, play, seek, and speed adjustment.

```jsx
import { animate, stagger } from "framer-motion"

// Animate DOM elements
const controls = animate(".boxes", { opacity: 1, x: 100 }, { duration: 0.5 })

// Animate with stagger effect
animate("li", { opacity: 1, y: 0 }, { delay: stagger(0.1, { from: "center" }) })

// Animate a single value
animate(0, 100, {
  duration: 2,
  onUpdate: (latest) => console.log(latest),
  onComplete: () => console.log("Animation finished")
})

// Animation sequences
animate([
  [".box1", { x: 100 }, { duration: 0.5 }],
  [".box2", { y: 100 }, { duration: 0.5, at: "-0.3" }],
  [".box3", { scale: 1.5 }, { duration: 0.3, at: "<" }]
])

// Playback controls
controls.pause()
controls.play()
controls.time = 0.5
controls.speed = 2
await controls
controls.stop()
```

--------------------------------