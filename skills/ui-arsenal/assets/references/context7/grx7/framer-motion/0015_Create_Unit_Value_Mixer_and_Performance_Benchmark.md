# Create Unit Value Mixer and Performance Benchmark

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-complex-value-framer-motion.html

Creates an interpolation function using Framer Motion's mix function that handles complex unit values including RGBA colors, pixel lengths, percentages, viewport units, and CSS variables. Measures performance by running 100,000 interpolation iterations and logs total execution time in milliseconds.

```javascript
const { mix } = window.Motion

/**
 * Create an interpolate function that mixes unit values.
 */
const mixer = mix(
  "rgba(255, 255, 255, 0) 100px 40% 20px rgba(255, 255, 255, 0) var(--test) 67% 20vh 1vw",
  "rgba(0, 0, 0, 0) 0px 0% 100px rgba(255, 255, 255, 0) var(--test) 45% 0vh 1vw"
)

const numRuns = 100000
let startTime = performance.now()

for (let i = 0; i < numRuns; i++) {
  mixer(i / numRuns)
}

const finish = performance.now() - startTime
console.log(`Total time: ${finish}ms`)
```

--------------------------------