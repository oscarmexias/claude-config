# Define Basic CSS Styles for Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll-animated-overlay.html

This CSS block defines basic styling for HTML elements like `body`, `#box`, and `#overlay`, along with a specific style for a data attribute `[data-layout-correct="false"]` to highlight layout issues. It sets up initial dimensions, background colors, and positioning for layout testing scenarios.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #overlay { position: fixed; inset: 0; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------