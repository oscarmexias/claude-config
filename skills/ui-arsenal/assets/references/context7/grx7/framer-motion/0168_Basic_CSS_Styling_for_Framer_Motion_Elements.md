# Basic CSS Styling for Framer Motion Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-rotate-scale-correction.html

Defines basic CSS styles for `body`, container, and box elements used in Framer Motion examples. It sets up dimensions, positioning, background colors, and includes a special rule for visual debugging when layout is incorrect.

```css
body { padding: 0; margin: 0; } #container-a { position: relative; width: 300px; height: 300px; } #box-a { width: 100px; height: 100px; background-color: #00cc88; } #container-b { position: relative; width: 300px; height: 600px; } #box-b { position: absolute; top: 100px; left: 100px; width: 200px; height: 300px; background-color: #09f; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------