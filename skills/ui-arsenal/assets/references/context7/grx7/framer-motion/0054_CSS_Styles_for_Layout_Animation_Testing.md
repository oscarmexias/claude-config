# CSS Styles for Layout Animation Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-single-element-layout-change-with-child.html

Defines the visual properties and layout states for box and child elements used in projection tests. Includes specific classes for state transitions and overflow triggers to test layout corrections.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------