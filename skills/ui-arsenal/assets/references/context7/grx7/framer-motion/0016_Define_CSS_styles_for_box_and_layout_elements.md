# Define CSS styles for box and layout elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-rotate-change.html

This CSS snippet defines basic styling for the page body, a `#box` element, and a special class `.b` for the box. It also includes styles for an overflow trigger and a data attribute to highlight layout issues. These styles prepare the elements for JavaScript-driven animations or layout tests.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------