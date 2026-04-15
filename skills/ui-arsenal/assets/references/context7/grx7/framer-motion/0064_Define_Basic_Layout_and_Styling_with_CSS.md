# Define Basic Layout and Styling with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-child.html

This CSS snippet defines basic styling for HTML elements like `body`, `#box`, `#size`, `#overlay`, and `#trigger-overflow`. It also includes a rule for `[data-layout-correct="false"]` to highlight layout issues. It sets margins, padding, dimensions, background colors, and positioning properties.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#size { height: 100px; }
#overlay { background-color: black; position: sticky; top: 0px; height: 200px; width: 200px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
\[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------