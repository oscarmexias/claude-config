# Construct Combined CSS Transform Keyframes from Spring Values

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-spring.html

This code block combines the independently generated `y` (translateY) and `scale` spring keyframes into a single array of CSS `transform` strings. It ensures that the animation duration is consistent across both properties by taking the maximum length of the keyframe arrays, preparing for a unified `transform` animation property.

```javascript
const maxKeyframes = Math.max(
  yKeyframes.length,
  scaleKeyframes.length
)
const transformOptions = {
  duration: maxKeyframes * springTimeResolution,
  ease: "linear",
}

const transformKeyframes = []
for (let i = 0; i < maxKeyframes; i++) {
  transformKeyframes.push(
    `translateY(${ yKeyframes[Math.min(i, yKeyframes.length - 1)] }px) scale(${ scaleKeyframes[Math.min(i, scaleKeyframes.length - 1)] })`
  )
}
```

--------------------------------