# CSS Styling for Framer Motion Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-mixed-transition.html

Defines the basic styling for parent, mid, and child elements, including their initial positions and dimensions. It also includes a class `.b` to demonstrate a layout change and a style for `[data-layout-correct='false']` to highlight potential layout issues during development.

```css
body { padding: 0; margin: 0; } #parent { position: relative; width: 200px; height: 200px; background-color: #00cc88; } #mid { position: absolute; width: auto; height: auto; left: 0; top: 0; } .b #mid { left: 100px; } #child { width: 50px; height: 50px; background-color: #0077ff; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------