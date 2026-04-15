# CSS Layout for Animation Container

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/warm-start-gsap.html

Defines the visual structure for the animation area. It uses Flexbox to wrap dynamically generated elements and sets the base dimensions and colors for the animated boxes.

```css
body { padding: 0; margin: 0; }
.container {
  padding: 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.container > div {
  width: 100px;
  height: 100px;
}
.box {
  width: 10px;
  height: 100px;
  background-color: #fff;
}
```

--------------------------------