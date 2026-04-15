# Imperative Viewport Detection with Framer Motion's inView() Function (JavaScript)

Source: https://context7.com/grx7/framer-motion/llms.txt

Explains the imperative `inView()` function for observing multiple elements and executing callbacks when they enter or exit the viewport. It demonstrates basic usage with cleanup, and advanced options for custom root, margins, and visibility thresholds, providing fine-grained control over viewport detection.

```javascript
import { inView, animate } from "framer-motion"

// Basic usage
const stopObserving = inView(".animate-on-scroll", (entry) => {
  // Element entered viewport
  animate(entry.target, { opacity: 1, y: 0 })

  // Return cleanup for when element exits
  return () => {
    animate(entry.target, { opacity: 0, y: 20 })
  }
})

// With options
inView(
  document.querySelectorAll(".card"),
  (entry) => {
    entry.target.classList.add("visible")
    // Return nothing to stop observing after first trigger
  },
  {
    root: document.querySelector(".scroll-container"),
    margin: "0px 0px -200px 0px",
    amount: 0.3 // 30% visible
  }
)

// Cleanup
stopObserving()
```

--------------------------------