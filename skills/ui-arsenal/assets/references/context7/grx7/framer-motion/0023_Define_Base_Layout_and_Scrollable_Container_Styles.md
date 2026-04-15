# Define Base Layout and Scrollable Container Styles (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-non-zero.html

This CSS snippet defines basic styling for the page body, a scrollable container (`#scroll`), and a child element (`#box`). It also includes styles for an overflow trigger and a data attribute for layout correction, setting up the visual environment for Framer Motion tests.

```css
body { padding: 0; margin: 0; } #scroll { overflow: scroll; position: relative; height: 200px; width: 500px; } #box { width: 100px; height: 100px; background: #00cc88; } .trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------