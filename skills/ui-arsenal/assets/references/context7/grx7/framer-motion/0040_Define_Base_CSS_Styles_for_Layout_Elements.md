# Define Base CSS Styles for Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-transform-parents-animate-2.html

This CSS snippet defines basic styles for the `body` and several `div` elements identified by IDs (`#a`, `#b`, `#scroller`, `#trigger-overflow`). It also includes a style for elements with `data-layout-correct="false"`. These styles set dimensions, positioning, background colors, and flexbox properties, providing a visual foundation for layout testing.

```css
body { padding: 0; margin: 0; } #a { width: 300px; height: 300px; position: absolute; top: 0; left: 0; background-color: #00cc88; } #b { width: 200px; height: 200px; background-color: #ffcc00; } #scroller { position: absolute; top: 200px; left: 10px; width: 500px; height: 200px; display: flex; justify-content: flex-end; align-items: flex-end; background-color: #09f; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------