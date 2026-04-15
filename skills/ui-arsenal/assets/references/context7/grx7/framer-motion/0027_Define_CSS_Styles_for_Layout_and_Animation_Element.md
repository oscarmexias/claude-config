# Define CSS Styles for Layout and Animation Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-with-child-rotate.html

This CSS snippet defines the foundational styles for the `body`, `#box`, and `#child` elements, including their initial positioning, dimensions, and background colors. It also specifies styles for a modified state (`#box.b`) and a debug state (`[data-layout-correct="false"]`), which are crucial for the JavaScript-driven animation and layout testing. A `#trigger-overflow` element is included, likely for testing scroll behavior or layout boundaries.

```css
body { padding: 0; margin: 0; } #box { position: absolute; top: 100px; left: 300px; width: 200px; height: 200px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #box.b { top: 200px; } #box.b #child { position: absolute; top: 150px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------