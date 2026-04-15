# Create Mixed Unit Value Interpolator with Framer Motion

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-object-greensock.html

Creates an interpolation function using Framer Motion's mix function that handles multiple unit types (numbers, viewport heights, pixels, and hex colors). The mixer function accepts a progress value between 0 and 1 and returns interpolated values across all mixed types.

```javascript
const { mix } = window.Motion

/**
 * Create an interpolate function that mixes unit values.
 */
const mixer = mix(
  [100, "50vh", "100px", "#fff"],
  [0, "0vh", "0px", "#000"]
)
```

--------------------------------