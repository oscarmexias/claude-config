# Manual Rotation Animation with requestAnimationFrame

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/pregenerated-background-color.html

Implements a frame-by-frame rotation animation using native JavaScript. It calculates rotation degrees based on elapsed time to ensure smooth playback regardless of frame rate.

```javascript
const boxes = document.querySelectorAll(".box")
let startTime = 0
const duration = 10000
const rotateRate = 360 / duration

function rotate(timestamp) {
  const elapsed = timestamp - startTime
  boxes.forEach((box, index) => {
    box.style.transform = `rotate(${elapsed * rotateRate}deg)`
  })
  requestAnimationFrame(rotate)
}

function animateRotation() {
  startTime = performance.now()
  requestAnimationFrame(rotate)
}
// animateRotation()
```

--------------------------------