# CSS Layout Styles for Framer Motion Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/nested-layout-change-scale-correction.html

Defines CSS styles for testing layout projection with parent and child elements, including base dimensions, background colors, and state-based modifications. Includes overflow trigger element and data attribute selector for layout validation feedback.

```css
body { padding: 0; margin: 0; }
#parent { width: 200px; height: 200px; background-color: #00cc88; }
#child { width: 100px; height: 100px; background-color: #09f; }
#parent.b { width: 400px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------