# Benchmark Framer Motion's `mix` Interpolation Function in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-array-framer-motion.html

This JavaScript snippet demonstrates how to use Framer Motion's `mix` function to create a unit value interpolator and then benchmarks its performance. It initializes a `mixer` function that interpolates between two arrays of values (numbers, vh units, px units, and hex colors) and measures the time taken to execute it one million times. This helps assess the efficiency of the interpolation for animations.

```javascript
const { mix } = window.Motion
/**
 * Create an interpolate function that mixes unit values.
 */
const mixer = mix(
  [100, "50vh", "100px", "#fff"],
  [0, "0vh", "0px", "#000"]
)
const numRuns = 1000000
let startTime = performance.now()
for (let i = 0; i < numRuns; i++) {
  mixer(i / numRuns)
}
const finish = performance.now() - startTime
console.log(`Total time: ${finish}ms`)
```

--------------------------------