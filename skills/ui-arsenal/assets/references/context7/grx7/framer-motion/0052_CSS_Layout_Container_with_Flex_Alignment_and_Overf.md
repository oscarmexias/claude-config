# CSS Layout Container with Flex Alignment and Overflow Trigger

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change-skew-container.html

Defines styling for a flex container with conditional alignment modes and a hidden trigger element for overflow detection. The container uses flex-end alignment by default and switches to flex-start with the 'b' class modifier. Includes error state styling with red background and reduced opacity.

```css
body { padding: 0; margin: 0; }
#container { width: 100px; height: 200px; display: flex; align-items: flex-end; }
#container.b { align-items: flex-start; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------