# Interpolate RGBA Colors and Measure Performance with GSAP

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-color-value-greensock.html

Utilizes the GSAP utility library to create an interpolation function between two RGBA color strings. It iterates through a set number of steps and logs the execution time to evaluate performance.

```javascript
/** * Create an interpolate function that mixes unit values. */
const px = gsap.utils.interpolate( "rgba(255, 255, 255, 0)", "rgba(0, 0, 0, 0)" )
const numRuns = 10
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  console.log(px(i / numRuns))
}
console.log(`First run: ${performance.now() - startTime}ms`)
```

--------------------------------