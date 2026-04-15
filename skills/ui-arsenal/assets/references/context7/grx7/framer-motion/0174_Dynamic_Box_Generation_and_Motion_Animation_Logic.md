# Dynamic Box Generation and Motion Animation Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/warm-start-framer-motion.html

Populates a container with 100 div elements and uses the Motion library to animate them. The animation includes randomized rotations and width transitions triggered after a 1-second delay.

```javascript
// Create boxes
const numBoxes = 100
let html = ""
for (let i = 0; i < numBoxes; i++) {
  html += "<div><div class=\"box\"></div></div>"
}
document.querySelector(".container").innerHTML = html

const { animate } = Motion
const boxes = document.querySelectorAll(".box")

setTimeout(() => {
  // Warm start
  boxes.forEach((box) => animate(
    box,
    {
      rotate: [0, Math.random() * 360],
      backgroundColor: ["#fff", "#f00"],
      width: ["0%", Math.random() * 100 + "%"],
      x: [0, 5],
    },
    {
      easing: "linear",
      duration: 1,
    }
  ))
}, 1000)
```

--------------------------------