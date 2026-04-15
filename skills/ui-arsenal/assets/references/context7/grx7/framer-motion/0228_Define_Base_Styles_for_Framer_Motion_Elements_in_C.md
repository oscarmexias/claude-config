# Define Base Styles for Framer Motion Elements in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-shared-deep.html

This CSS snippet defines basic styling for several HTML elements (`#a`, `#b`, `#a-2`, `#b-2`, `#a-3`, `#b-3`) that are intended to be animated using Framer Motion's projection system. It sets dimensions, background colors, and positioning for these elements, including a special style for elements with `data-layout-correct='false'` to highlight layout issues. The styles prepare the elements for visual representation and interaction within a layout animation context.

```css
body { padding: 0; margin: 0; } #a { width: 100px; height: 100px; background-color: #00cc88; } #b { width: 200px; height: 200px; background-color: #0077ff; position: absolute; top: 50px; left: 50px; } #a-2, #b-2 { width: 50px; height: 50px; background-color: #fff; } #a-3, #b-3 { width: 25px; height: 25px; background-color: #000; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------