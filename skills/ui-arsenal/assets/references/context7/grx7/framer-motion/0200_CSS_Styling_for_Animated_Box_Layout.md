# CSS Styling for Animated Box Layout

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-nested-scale-correction.html

Defines base styles for animated boxes and layout container. Includes styles for the open state that expands box height, flexbox parent layout, and error state styling with reduced opacity.

```css
body { padding: 0; margin: 0; }
.box { width: 100px; height: 100px; background-color: #00cc88; }
.box.open { height: 200px; }
#parent { display: flex; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------