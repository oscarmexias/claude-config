# Layout Styling for Projection Testing in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-child-scroll-change-offset.html

Defines the visual properties and positioning for elements used in projection testing, including a sticky overlay and a relative box. It includes specific styles for layout correction debugging using data attributes.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#size { height: 100px; }
#overlay { background-color: black; position: sticky; top: 0px; height: 200px; width: 200px; }
#overlay.b #box { position: relative; left: 300px; top: 300px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------