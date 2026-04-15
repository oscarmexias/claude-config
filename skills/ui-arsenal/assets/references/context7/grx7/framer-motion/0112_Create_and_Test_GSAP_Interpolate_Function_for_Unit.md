# Create and Test GSAP Interpolate Function for Unit Values in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-complex-value-greensock.html

This JavaScript snippet demonstrates the use of `gsap.utils.interpolate` to create a function that mixes complex unit values (e.g., `rgba`, `px`, `%`, `vh`, `vw`). It then measures the performance of calling this interpolation function multiple times. This utility is useful for animating properties with mixed units.

```javascript
/**
 * Create an interpolate function that mixes unit values.
 */
const px = gsap.utils.interpolate(
  "rgba(255, 255, 255, 0) 100px 40% 20px rgba(255, 255, 255, 0) var(--test) 67% 20vh 1vw",
  "rgba(0, 0, 0, 0) 0px 0% 100px rgba(255, 255, 255, 0) var(--test) 45% 0vh 1vw"
)
const numRuns = 10
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  px(i / numRuns)
}
console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------