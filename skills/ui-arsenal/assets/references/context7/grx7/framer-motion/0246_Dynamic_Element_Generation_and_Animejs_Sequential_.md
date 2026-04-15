# Dynamic Element Generation and Anime.js Sequential Animations

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/cold-start-anime.html

Generates 100 box elements and injects them into the DOM. It then triggers two sequential animation phases using Anime.js to handle rotations, color changes, and unit conversions from percentages to pixels.

```javascript
// Create boxes 
const numBoxes = 100 
let html = `` 
for (let i = 0; i < numBoxes; i++) { 
  html += `<div><div class="box"></div></div>` 
} 
document.querySelector(".container").innerHTML = html 
const boxes = document.querySelectorAll(".box") 

setTimeout(() => { 
  // Cold start (read from DOM) 
  boxes.forEach((box) => 
    anime({ 
      targets: box, 
      rotate: Math.random() * 360, 
      backgroundColor: "#f00", 
      width: Math.random() * 100 + "%", 
      translateX: 5, 
      duration: 1000, 
      easing: "linear", 
    }) 
  ) 
  
  setTimeout(() => { 
    // Unit conversion 
    boxes.forEach((box) => 
      anime({ 
        targets: box, 
        width: Math.random() * 100 + "px", 
        translateX: "50%", 
        duration: 1000, 
        easing: "linear", 
      }) 
    ) 
  }, 1500) 
}, 1000)
```

--------------------------------