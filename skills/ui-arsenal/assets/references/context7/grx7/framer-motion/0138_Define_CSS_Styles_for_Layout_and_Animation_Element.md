# Define CSS Styles for Layout and Animation Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-nested-deep.html

This CSS snippet defines basic styling for several HTML elements (`body`, `#parent`, `#mid`, `#child`, `#grandchild`) involved in a layout and animation demonstration. It sets dimensions, background colors, positioning, and flexbox properties. It also includes specific styles for a `.b` class applied to `#parent` and `#grandchild` to simulate state changes, and a `data-layout-correct` attribute for visual debugging.

```css
body { padding: 0; margin: 0; } #parent { position: relative; width: 200px; height: 200px; background-color: #00cc88; display: flex; align-items: flex-start; justify-content: flex-start; } #mid { width: 100px; height: 100px; background-color: white; display: flex; align-items: flex-start; justify-content: flex-start; } #parent.b { top: 100px; left: 100px; } #child { width: 80px; height: 80px; background-color: #0077ff; } #grandchild { width: 20px; height: 20px; background-color: black; position: relative; } .b #grandchild { top: 1px; left: 1px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------