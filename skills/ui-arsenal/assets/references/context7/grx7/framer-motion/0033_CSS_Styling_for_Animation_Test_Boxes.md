# CSS Styling for Animation Test Boxes

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-target.html

Defines styles for two main animated boxes (box-a and box-b) with different positions and colors, button element with state-based width changes, child elements, and an overflow trigger element. Includes error state styling for layout validation failures.

```css
body { padding: 0; margin: 0; }
#box-a { position: absolute; left: 100px; top: 100px; width: 200px; height: 200px; background-color: #00cc88; }
#box-b { position: absolute; left: 600px; top: 100px; width: 200px; height: 200px; background-color: #09f; }
#button { width: 100px; height: 100px; top: 0; left: 0; background-color: rgb(132, 0, 255); }
#button.b { width: 300px; }
#child-a, #child-b { position: absolute; left: 0; top: 0; width: 50px; height: 50px; background-color: yellow; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------