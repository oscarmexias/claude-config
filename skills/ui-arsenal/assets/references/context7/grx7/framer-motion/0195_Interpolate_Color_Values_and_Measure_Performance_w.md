# Interpolate Color Values and Measure Performance with Framer Motion in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-color-value-framer-motion.html

This JavaScript code demonstrates the use of Framer Motion's `interpolate` function to create a color mixer. It smoothly transitions between two RGBA color values based on a progress input (0-1) and includes a performance measurement loop to evaluate the interpolation's execution time.

```javascript
const { interpolate, mixColor } = window.Motion
/**
 * Create an interpolate function that mixes unit values.
 */
const mixer = interpolate(
  [0, 1],
  ["rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0)"]
)
const numRuns = 10
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  console.log(mixer(i / numRuns))
}
const finish = performance.now() - startTime
console.log(`Total time: ${finish}ms`)
```

--------------------------------