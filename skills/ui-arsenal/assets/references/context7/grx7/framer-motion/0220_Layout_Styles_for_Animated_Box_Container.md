# Layout Styles for Animated Box Container

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/cold-start-anime.html

Defines the layout for a flexible container and the dimensions for child box elements. It ensures a clean reset of padding and margins for the body and sets up the grid structure.

```css
body { padding: 0; margin: 0; } 
.container { padding: 100px; width: 100%; display: flex; flex-wrap: wrap; } 
.container > div { width: 100px; height: 100px; } 
.box { width: 10%; height: 100px; background-color: #fff; }
```

--------------------------------