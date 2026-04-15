# Define Basic CSS Styles for Layout and Positioning

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-shared-to-fixed-page-scroll-no-stick.html

This CSS block defines fundamental styles for the body, a placeholder element, and classes for sticky and fixed positioning. It also includes a rule to highlight elements with `data-layout-correct="false"` for debugging purposes, indicating layout issues.

```css
body { padding: 0; margin: 0; } #position { width: 1px; height: 200px; } .sticky { position: sticky; top: 100px; width: 100%; height: 200px; background: #0088ff; } .fixed { position: fixed; top: 0; left: 0; width: 300px; height: 300px; background: #0088ff; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------