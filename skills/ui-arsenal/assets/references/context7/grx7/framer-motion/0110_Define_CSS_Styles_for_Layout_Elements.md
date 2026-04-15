# Define CSS Styles for Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-element-scroll-scale.html

This CSS code defines basic styling for various HTML elements, including a scrollable container (`#scroll`), a box (`#box`), a button (`#button`), and an overflow trigger. It sets up initial positioning, dimensions, and visual properties for elements that will be manipulated by Framer Motion's projection system.

```css
body { padding: 0; margin: 0; } #box { width: 300px; height: 100px; position: absolute; top: 200px; left: 50%; } #button { position: absolute; inset: 0; background-color: #00cc88; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; } #scroll { position: relative; width: 800px; height: 400px; overflow: scroll; }
```

--------------------------------