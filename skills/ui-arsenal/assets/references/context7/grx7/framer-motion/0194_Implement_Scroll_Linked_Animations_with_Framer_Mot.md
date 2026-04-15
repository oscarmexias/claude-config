# Implement Scroll-Linked Animations with Framer Motion's `scroll()` Function

Source: https://context7.com/grx7/framer-motion/llms.txt

The `scroll()` function enables linking animations or callbacks to scroll progress, leveraging the native ScrollTimeline API with automatic fallbacks. It supports custom scroll containers, axis definitions, and seamless integration into React components for dynamic, scroll-driven effects.

```jsx
import { animate, scroll } from "framer-motion"

// Link an animation to scroll progress
const animation = animate(".progress-bar", { scaleX: [0, 1] }, { duration: 1 })
scroll(animation)

// With custom scroll container and axis
scroll(animation, {
  source: document.querySelector(".scroll-container"),
  axis: "x"
})

// Callback-based scroll tracking
scroll((progress) => {
  console.log(`Scroll progress: ${progress * 100}%`)
  // Update DOM, canvas, WebGL, etc.
})

// Combined with React
function ScrollLinkedAnimation() {
  useEffect(() => {
    const controls = animate(".hero-text",
      { opacity: [1, 0], y: [0, -100] },
      { duration: 1 }
    )

    return scroll(controls, {
      target: document.querySelector(".hero-section"),
      offset: ["start start", "end start"]
    })
  }, [])

  return <div className="hero-section">...</div>
}
```

--------------------------------