# CSS Layout and Box Styling

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/pregenerated-background-color.html

Defines the flexbox container and the initial state for animated box elements. Includes performance optimizations like will-change and hidden overflow.

```css
body {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 100vh;
  overflow: hidden;
}

.box {
  width: 50px;
  height: 50px;
  background-color: #f00;
  opacity: 0;
  will-change: auto !important;
}
```

--------------------------------