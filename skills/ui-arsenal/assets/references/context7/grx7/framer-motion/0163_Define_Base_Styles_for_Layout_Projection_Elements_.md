# Define Base Styles for Layout Projection Elements in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-static-parent-child-grandchild.skip.html

This CSS block defines the initial styling for `body`, `#parent`, `#child`, and `#grandChild` elements, setting their dimensions and background colors. It also includes a class `.b` for `#parent` which applies a significant layout transformation, and styles for a `trigger-overflow` element and a data attribute for layout correctness visualization. These styles are crucial for demonstrating layout changes in the associated JavaScript.

```css
body { padding: 0; margin: 0; } #parent { width: 100px; height: 100px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #parent.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; display: flex; justify-content: flex-end; } #grandChild { width: 100px; height: 100px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------