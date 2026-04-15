# Declarative Keyframe Animation with Motion.animate

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/pregenerated-background-color.html

Utilizes the Framer Motion library to animate opacity and background color across multiple elements. It uses an array of values to define keyframes and sets the animation to loop infinitely.

```javascript
Motion.animate(
  boxes,
  {
    opacity: [0, 1],
    backgroundColor: ["#f00", "#00f"]
  },
  {
    duration: duration / 1000,
    repeat: Infinity
  }
)
```

--------------------------------