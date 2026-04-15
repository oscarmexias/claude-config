# Benchmark GSAP Interpolate Function Performance in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-number-value-greensock.html

This JavaScript code snippet measures the performance of GSAP's `gsap.utils.interpolate` utility. It creates an interpolation function and then executes it millions of times to calculate the total execution duration, providing insight into its efficiency for high-frequency operations.

```javascript
/** * Create an interpolate function that mixes unit values. */ const px = gsap.utils.interpolate(0, 100)
const numRuns = 100000000
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  px(i / numRuns)
}
console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------