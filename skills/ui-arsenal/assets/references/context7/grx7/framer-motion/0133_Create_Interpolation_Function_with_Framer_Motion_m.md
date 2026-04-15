# Create Interpolation Function with Framer Motion mix

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-number-value-framer-motion.html

Uses Framer Motion's mix function to create a pixel value interpolator between 0 and 100. The snippet then benchmarks the interpolation performance by calling the function 100 million times and measuring execution time using performance.now().

```javascript
const { mix } = window.Motion
/**
 * Create an interpolate function that mixes unit values.
 */
const px = mix(0, 100)
const numRuns = 100000000
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  px(i / numRuns)
}
console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------