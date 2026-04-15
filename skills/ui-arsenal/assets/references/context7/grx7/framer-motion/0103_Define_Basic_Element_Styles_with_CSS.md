# Define Basic Element Styles with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-child-scroll-change.html

This CSS block defines basic styling for several HTML elements, including a main box, an overlay, and an overflow trigger. It sets dimensions, background colors, positioning, and handles layout correction indicators.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #size { height: 100px; } #overlay { background-color: black; position: sticky; top: 0px; height: 200px; width: 200px; } #overlay.b #box { position: relative; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------