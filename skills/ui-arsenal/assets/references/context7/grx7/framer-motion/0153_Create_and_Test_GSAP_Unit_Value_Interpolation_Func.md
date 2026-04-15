# Create and Test GSAP Unit Value Interpolation Function in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-unit-value-greensock.html

This JavaScript snippet demonstrates how to use `gsap.utils.interpolate` to create a function that smoothly transitions between two CSS unit values, including those incorporating CSS variables. The resulting `px` function takes a progress value (0-1) and returns an interpolated string. The code then runs this interpolator multiple times and measures its execution performance.

```javascript
/**
 * Create an interpolate function that mixes unit values.
 */
const px = gsap.utils.interpolate(
  "var(--test-1, 1) 10px",
  "var(--test-9, 3) 60px"
)
const numRuns = 10
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  console.log(px(i / numRuns))
}
console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------