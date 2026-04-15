# Styling for Framer Motion Elements (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/benchmarks/cold-start-framer-motion.html

This CSS defines basic styling for the page body, a container, and individual box elements. It sets up a flexible layout for the boxes and provides initial dimensions and background color for the `.box` class, which will be animated by JavaScript.

```css
body { padding: 0; margin: 0; } .container { padding: 50px; width: 80%; display: flex; flex-wrap: wrap; } .container > div { width: 50px; height: 50px; } .box { width: 10px; height: 50px; background-color: #fff; }
```

--------------------------------