# Define CSS Styles for Box and Child Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-with-child-layout-change-interrupt.html

This CSS defines base styles and state-specific styles for `#box` and `#child` elements, including width, height, background color, and positioning. It also includes a rule for visual debugging when `data-layout-correct` is false, and an off-screen element to trigger overflow.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; } #child.b { width: 100px; position: absolute; top: 10px; left: 10px; padding: 10px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------