# Define Base CSS Styles for HTML Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-nested-promote-new-mix-interrupt.html

This CSS snippet defines basic styling for the `body` element and several `div` elements identified by IDs (`#box-a`, `#box-b`, `#child-a`, `#child-b`, `#trigger-overflow`). It also includes a rule for elements with `data-layout-correct="false"` to visually indicate incorrect layouts. These styles are foundational for the JavaScript code that manipulates these elements.

```css
body { padding: 0; margin: 0; } #box-a { width: 100px; height: 100px; background-color: #00cc88; } #box-b { position: absolute; top: 100px; left: 100px; width: 200px; height: 300px; background-color: #09f; } #child-a { width: 50px; height: 50px; background-color: #09f; } #child-b { width: 100px; height: 50px; background-color: #00cc88; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------