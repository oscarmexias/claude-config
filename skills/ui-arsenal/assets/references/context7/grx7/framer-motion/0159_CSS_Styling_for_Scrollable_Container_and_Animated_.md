# CSS Styling for Scrollable Container and Animated Box

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll-layout-change.html

This CSS defines the basic layout for a web page, including a scrollable container (`#scroll`) and a movable box (`#box`). It sets initial positions, dimensions, and background colors, and includes a class (`.b`) to change the box's position. A `.trigger-overflow` element ensures scrollability, and a `[data-layout-correct='false']` style provides visual feedback for layout issues.

```css
body { padding: 0; margin: 0; } #scroll { overflow: scroll; position: relative; height: 200px; width: 500px; } #box { position: absolute; left: 0px; top: 0px; width: 100px; height: 100px; background: #00cc88; } #box.b { left: 100px; } .trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------