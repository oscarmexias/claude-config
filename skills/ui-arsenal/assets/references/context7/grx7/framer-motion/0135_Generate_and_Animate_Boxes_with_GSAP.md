# Generate and Animate Boxes with GSAP

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/cold-start-gsap.html

Creates 100 box elements dynamically and applies sequential GSAP animations. First animation rotates boxes with random angles and color changes after 1 second delay. Second animation converts width units from percentage to pixels and repositions boxes after 2.5 seconds total.

```javascript
const numBoxes = 100
let html = ``
for (let i = 0; i < numBoxes; i++) {
  html += `<div><div class="box"></div></div>`
}
document.querySelector(".container").innerHTML = html
const boxes = document.querySelectorAll(".box")
setTimeout(() => {
  boxes.forEach((box) => gsap.to(box, {
    rotate: Math.random() * 360,
    backgroundColor: "#f00",
    width: Math.random() * 100 + "%",
    x: 5,
    duration: 1
  }))
  setTimeout(() => {
    boxes.forEach((box) => gsap.to(box, {
      width: Math.random() * 100 + "px",
      x: "50%",
      duration: 1
    }))
  }, 1500)
}, 1000)
```

--------------------------------