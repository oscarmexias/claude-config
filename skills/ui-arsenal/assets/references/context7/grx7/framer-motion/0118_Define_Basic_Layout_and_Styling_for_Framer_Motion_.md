# Define Basic Layout and Styling for Framer Motion Elements (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-to-static.html

This CSS snippet establishes foundational styles for a web page, including `body` resets, and specific dimensions and backgrounds for `#container`, `#fixed`, and `#child` elements. It also defines a fixed positioning for `#fixed` and a utility rule for `[data-layout-correct="false"]` to visually indicate layout issues, preparing the DOM for Framer Motion interactions.

```css
body { padding: 0; margin: 0; } #container { width: 100px; height: 100px; } #fixed { position: fixed; top: 0; left: 0; width: 500px; height: 100px; background: #00cc88; display: flex; align-items: flex-start; } #child { width: 100px; height: 100px; background: #0077ff; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------