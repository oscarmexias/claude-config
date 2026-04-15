# Define basic styling and layout correction for elements in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-shared-single.html

This CSS snippet defines basic styling for the body, and two elements with IDs 'a' and 'b', including their dimensions, background colors, and positioning. It also includes a hidden 'trigger-overflow' element and a style rule to highlight elements with `data-layout-correct="false"` for debugging layout issues.

```css
body { padding: 0; margin: 0; } #a { width: 100px; height: 100px; background-color: #00cc88; } #b { width: 200px; height: 200px; background-color: #0077ff; position: absolute; top: 50px; left: 50px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------