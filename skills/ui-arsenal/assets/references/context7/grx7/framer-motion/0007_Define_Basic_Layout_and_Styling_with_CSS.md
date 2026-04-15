# Define Basic Layout and Styling with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-single-element.html

This CSS snippet defines foundational styles for common HTML elements and specific IDs, including `body`, `#box`, and `#child`. It sets dimensions, background colors, positioning, and includes a rule for highlighting elements with `data-layout-correct="false"` for debugging purposes.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------