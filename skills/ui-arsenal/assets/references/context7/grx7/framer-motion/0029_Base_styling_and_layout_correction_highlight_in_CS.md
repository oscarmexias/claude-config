# Base styling and layout correction highlight in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/interrupt-delay-after.html

This CSS defines basic styling for the page body and a `#box` element, including padding, margins, dimensions, and background color. It also includes a rule to visually highlight elements where the `data-layout-correct` attribute is set to `false`, overriding their background and opacity.

```css
body { padding: 100px; margin: 0; } #box { width: 100px; height: 100px; background-color: #0077ff; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 1 !important; }
```

--------------------------------