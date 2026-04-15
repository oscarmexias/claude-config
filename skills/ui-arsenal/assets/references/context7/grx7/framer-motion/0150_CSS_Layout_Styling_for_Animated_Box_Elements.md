# CSS Layout Styling for Animated Box Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-page-scroll.html

Defines base and animated state styles for a box element with layout transitions. Includes styles for overflow trigger detection and validation state indicators. The base box is 100x100px with green background, while the animated state (class 'b') expands to 200x200px with absolute positioning and padding adjustments.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------