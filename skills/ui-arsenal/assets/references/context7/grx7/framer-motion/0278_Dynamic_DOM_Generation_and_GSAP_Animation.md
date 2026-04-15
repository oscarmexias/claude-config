# Dynamic DOM Generation and GSAP Animation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/warm-start-gsap.html

JavaScript logic to inject 100 div elements into a container and animate them. It utilizes GSAP's set and to methods to handle complex property transitions including rotation, width, and color with randomized values.

```javascript
// Create boxes
const numBoxes = 100;
let html = ``;
for (let i = 0; i < numBoxes; i++) {
  html += `<div><div class="box"></div></div>`;
}
document.querySelector(".container").innerHTML = html;

const boxes = document.querySelectorAll(".box");

// Initial state
gsap.set(boxes, {
  rotate: 0,
  backgroundColor: "#fff",
  width: "0%",
  x: 0,
});

setTimeout(() => {
  // Warm start animation
  boxes.forEach((box) =>
    gsap.to(box, {
      rotate: Math.random() * 360,
      backgroundColor: "#f00",
      width: Math.random() * 100 + "%",
      x: 5,
      duration: 1,
    })
  );
}, 1000);
```

--------------------------------