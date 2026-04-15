# Animate Elements using Web Animations API in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/cold-start-waapi.html

Generates 100 box elements and applies two sequential animation phases with randomized properties. It uses commitStyles() and cancel() within requestAnimationFrame to persist the final state of the animation efficiently.

```javascript
// Create boxes
const numBoxes = 100
let html = ""
for (let i = 0; i < numBoxes; i++) {
  html += "<div><div class=\"box\"></div></div>"
}
document.querySelector(".container").innerHTML = html
const boxes = document.querySelectorAll(".box")

setTimeout(() => {
  boxes.forEach((box) => {
    const animation = box.animate(
      {
        rotate: Math.random() * 360 + "deg",
        backgroundColor: "#f00",
        width: Math.random() * 100 + "%",
        translate: "5px 0",
      },
      {
        duration: 1000,
        fill: "both",
      }
    )
    animation.onfinish = () => {
      requestAnimationFrame(() => {
        animation.commitStyles()
        animation.cancel()
      })
    }
  })

  setTimeout(() => {
    boxes.forEach((box) => {
      const animation = box.animate(
        {
          width: Math.random() * 100 + "px",
          translate: "50% 0",
        },
        {
          duration: 1000,
          fill: "both",
        }
      )
      animation.onfinish = () => {
        requestAnimationFrame(() => {
          animation.commitStyles()
          animation.cancel()
        })
      }
    })
  }, 1500)
}, 1000)
```

--------------------------------