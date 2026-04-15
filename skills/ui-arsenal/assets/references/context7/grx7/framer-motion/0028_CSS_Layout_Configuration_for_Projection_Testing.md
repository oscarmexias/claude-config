# CSS Layout Configuration for Projection Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-nested-parent-scale-child-layout-change.html

Defines the visual styles for parent and child elements, including absolute positioning and flexbox alignment. It also includes a state class '.b' for layout transitions and a utility selector for highlighting layout errors.

```css
body { padding: 0; margin: 0; }
#parent { width: 100px; height: 100px; background-color: #00cc88; position: absolute; top: 100px; left: 100px; display: flex; justify-content: flex-start; align-items: flex-start; }
#parent.b { justify-content: flex-end; align-items: flex-end; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------