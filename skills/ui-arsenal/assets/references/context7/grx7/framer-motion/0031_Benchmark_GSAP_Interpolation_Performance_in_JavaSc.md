# Benchmark GSAP Interpolation Performance in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-array-greensock.html

Measures the execution time of GSAP's utility interpolation function across one million iterations. It utilizes the performance.now() API to provide high-resolution timestamps for benchmarking.

```javascript
/**
 * Create an interpolate function that mixes unit values.
 */
const px = gsap.utils.interpolate(
  [100, 100, 100, 100],
  [0, 0, 0, 0]
)
const numRuns = 1000000
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  px(i / numRuns)
}
console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------