# Define Base Styles for Framer Motion Elements (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-sibling.html

This CSS snippet establishes the foundational styling for the HTML elements used in the Framer Motion demonstration. It sets up a flex container, defines basic dimensions and background for `.box` elements, and includes a specific style to visually indicate when a layout is incorrect using `data-layout-correct` attribute.

```css
body { padding: 100px; margin: 0; } #container { display: flex; flex-direction: column; } .box { width: 100px; height: 100px; background-color: #0077ff; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 1 !important; }
```

--------------------------------