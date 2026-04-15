# Layout Styling for Projection Elements in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-with-child-rotate-animate.html

Defines the visual properties and positioning for the box and child elements used in the projection test. It includes absolute positioning, dimensions, and specific styles for layout state changes.

```css
body { padding: 0; margin: 0; } #box { position: absolute; top: 100px; left: 300px; width: 200px; height: 200px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #box.b { top: 200px; } #box.b #child { position: absolute; top: 150px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------