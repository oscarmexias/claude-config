# Performance Benchmark for Mix Interpolation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-object-greensock.html

Measures execution time of the mixer interpolation function across 1 million iterations. Uses performance.now() to calculate total runtime in milliseconds and logs the result to console for performance analysis.

```javascript
const numRuns = 1000000
let startTime = performance.now()

for (let i = 0; i < numRuns; i++) {
  mixer(i / numRuns)
}

const finish = performance.now() - startTime
console.log(`Total time: ${finish}ms`)
```

--------------------------------