# Generate Spring Animation Keyframes for Optimized Appear

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-spring.html

This function, `generateSpringKeyframes`, calculates a series of discrete keyframe values for a spring animation between a given `from` and `to` value. It simulates the spring's motion over time, producing a sequence of values that can be used for custom, optimized animations. The generated keyframes are then applied to the `y` and `scale` properties.

```javascript
const springTimeResolution = 10

function generateSpringKeyframes(from, to) {
  let t = 0
  const keyframes = []
  const springAnimation = spring({
    keyframes: [from, to],
    stiffness,
    damping,
    mass,
  })

  let state = { done: false, value: from }
  while (!state.done) {
    state = springAnimation.next(t)
    keyframes.push(state.value)
    t += springTimeResolution
  }
  return keyframes
}

const yKeyframes = generateSpringKeyframes(0, 100)
const scaleKeyframes = generateSpringKeyframes(1, 2)
```

--------------------------------