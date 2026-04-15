# Styling for Framer Motion Layout Animation Elements (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-needs-reset.html

This CSS defines the visual styles and initial positions for various `div` elements (`#box-a`, `#box-b`, `#mid-a`, `#mid-b`, `#child-a`, `#child-b`) used in a Framer Motion layout animation example. It sets up absolute and relative positioning, dimensions, and background colors. A `.moved` class is included to demonstrate a state change for animation, and a data attribute selector highlights incorrect layout states.

```css
body { padding: 0; margin: 0; } #box-a { position: absolute; top: 0px; left: 0px; width: 100px; height: 100px; background-color: #00cc88; } #box-b { position: absolute; top: 100px; left: 100px; width: 100px; height: 100px; background-color: #09f; } #mid-a, #mid-b { position: relative; width: 50px; height: 50px; } #child-a { position: absolute; top: 50px; width: 50px; height: 50px; background-color: #09f; } #child-b { position: absolute; top: 100px; width: 50px; height: 50px; background-color: #00cc88; } #child-a.moved { top: 100px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------