# Interpolate Unit Values using Framer Motion mix

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-unit-value-framer-motion.html

Demonstrates the use of the mix function to interpolate between strings containing CSS variables and pixel values. It also includes a performance check to measure the execution time of multiple runs.

```javascript
const { mix } = window.Motion

/**
 * Create an interpolate function that mixes unit values.
 */
const px = mix("var(--test-1) 10px", "var(--test-9) 60px")

const numRuns = 10
let startTime = performance.now()

for (let i = 0; i < numRuns; i++) {
  console.log(i / numRuns)
  console.log(px(i / numRuns))
}

console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------