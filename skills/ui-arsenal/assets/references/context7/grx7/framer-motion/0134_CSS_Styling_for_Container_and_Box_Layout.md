# CSS Styling for Container and Box Layout

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/mix-complex-value-framer-motion.html

Base CSS styles that define a flex container with padding and individual box dimensions. The box class creates a 10px by 100px white rectangle used as a visual element in the demonstration.

```css
body { padding: 0; margin: 0; }
.container { padding: 100px; width: 100%; display: flex; flex-wrap: wrap; }
.container > div { width: 100px; height: 100px; }
.box { width: 10px; height: 100px; background-color: #fff; }
```

--------------------------------