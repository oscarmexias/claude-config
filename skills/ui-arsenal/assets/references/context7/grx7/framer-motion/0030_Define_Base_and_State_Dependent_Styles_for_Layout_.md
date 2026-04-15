# Define Base and State-Dependent Styles for Layout Elements (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/nested-layout-change-mid-projection.html

This CSS snippet defines the initial styling for `body`, `#box`, and `#child` elements, including their dimensions and background colors. It also specifies how these elements should change when the class `b` or `c` is applied, demonstrating responsive or state-driven layout adjustments. Additionally, it includes a hidden overflow trigger and a style for incorrect layout states.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; } #child.b { width: 100px; position: absolute; top: 10px; left: 10px; padding: 10px; } #child.c { left: 50px; width: 25px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------