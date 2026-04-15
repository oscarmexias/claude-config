# Handle Animation Start and Validate Interruption

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff.html

Implements animation start callback that validates optimized animation interruption. After 100ms, it triggers a scale and opacity animation that should interrupt the optimized transform animation, then verifies computed styles match expected values using frame post-render callbacks.

```javascript
onAnimationStart: () => {
  const box = document.getElementById("box")
  box.style.backgroundColor = "green"
  setTimeout(() => {
    animate(
      box,
      { scale: 2, opacity: 0.1 },
      { duration: 0.3, ease: "linear" }
    ).then(() => {
      frame.postRender(() => {
        if (getComputedStyle(box).opacity !== "0.1") {
          showError(
            document.getElementById("box"),
            `opacity animation didn't interrupt optimised animation. Opacity was ${getComputedStyle(box).opacity} instead of 0.1.`
          )
        }
        const { width, left } = box.getBoundingClientRect()
        if (Math.round(width) !== 200) {
          showError(
            document.getElementById("box"),
            `scale animation didn't interrupt optimised animation. Width was ${width}px instead of 200px.`
          )
        }
        if (left <= 100) {
          showError(
            document.getElementById("box"),
            `scale animation incorrectly interrupted optimised animation. Left was ${left}px instead of 100px.`
          )
        }
      })
    })
  }, 100)
}
```

--------------------------------