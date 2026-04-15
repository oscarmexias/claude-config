# Apply Base and Element Styles with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-change-with-stick.html

This CSS block defines basic styling for the body, a sticky `#box` element, and helper elements like `#size` and `#trigger-overflow`. It also includes a rule to highlight elements with `data-layout-correct="false"` for debugging layout issues. The `#box` is set to be sticky at the top of the viewport.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; position: sticky; top: 0px; } #size { height: 100px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------