# Animating Multiple Elements with Framer Motion (JavaScript)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/cold-start-framer-motion.html

This JavaScript code dynamically generates 200 `div` elements, each containing a `.box` element, and inserts them into a container. It then uses the `Motion.animate` function to apply two sequential animation phases to these boxes. The first phase animates rotation, background color, width (percentage), and x-position, while the second phase demonstrates value conversion by animating width (pixels) and x-position (percentage).

```javascript
// Create boxes const numBoxes = 200
let html = ``
for (let i = 0; i < numBoxes; i++) {
  html += `<div><div class="box"></div></div>`
}
document.querySelector(".container").innerHTML = html

const { animate } = Motion
const boxes = document.querySelectorAll(".box")

setTimeout(() => {
  // Cold start (read from DOM)
  boxes.forEach((box) =>
    animate(
      box,
      {
        rotate: Math.random() * 360,
        backgroundColor: "#f00",
        width: Math.random() * 100 + "%",
        x: 5,
      },
      {
        ease: "linear",
        duration: 1,
      }
    )
  )

  setTimeout(() => {
    // Value conversion
    boxes.forEach((box) =>
      animate(
        box,
        {
          width: Math.random() * 100 + "px",
          x: "10%",
        },
        {
          ease: "linear",
          duration: 1,
        }
      )
    )
  }, 1500)
}, 1000)
```

--------------------------------