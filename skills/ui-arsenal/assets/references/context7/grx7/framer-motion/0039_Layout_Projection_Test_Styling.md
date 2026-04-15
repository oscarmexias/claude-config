# Layout Projection Test Styling

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-page-scroll-non-zero.html

CSS styles to define a scrollable container and a target element for projection testing. Includes a specific style for elements marked with data-layout-correct='false' to highlight projection errors.

```css
body { padding: 0; margin: 0; }
#scroll { overflow: scroll; position: relative; height: 200px; width: 500px; top: 100px; }
#box { width: 200px; height: 200px; background: #00cc88; }
.trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------