# Layout Projection Test Styles in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll-scale.html

Defines the visual properties and positioning for test elements like the box and button. It includes specific styles for layout correction indicators and overflow triggers to simulate complex layout scenarios.

```css
body { padding: 0; margin: 0; }
#box { width: 300px; height: 100px; position: absolute; top: 200px; left: 50%; }
#button { position: absolute; inset: 0; background-color: #00cc88; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------