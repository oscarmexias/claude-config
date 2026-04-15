# CSS Layout Styles for Scrollable Containers

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-to-layout.html

Defines the visual structure for a scrollable container and a target box element. Includes utility classes for triggering overflow and marking incorrect layouts during projection tests.

```css
body { padding: 0; margin: 0; }
#scroll { overflow: scroll; position: relative; height: 200px; width: 500px; }
#box { width: 100px; height: 100px; background: #00cc88; }
#scroll.b { overflow: visible; top: 200px; left: 100px; }
#scroll.b .trigger-overflow { display: none; }
.trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------