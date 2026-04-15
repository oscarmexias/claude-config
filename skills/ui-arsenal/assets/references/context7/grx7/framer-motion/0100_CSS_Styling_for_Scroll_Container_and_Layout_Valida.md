# CSS Styling for Scroll Container and Layout Validation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/element-scroll.html

Defines CSS styles for a scrollable container with a positioned box element and visual indicators for layout validation. Includes styles for overflow scrolling, element dimensions, and a data attribute selector to highlight incorrect layouts with red background and reduced opacity.

```css
body { padding: 0; margin: 0; }
#scroll { overflow: scroll; position: relative; height: 200px; width: 500px; }
#box { width: 100px; height: 100px; background: #00cc88; }
.trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------