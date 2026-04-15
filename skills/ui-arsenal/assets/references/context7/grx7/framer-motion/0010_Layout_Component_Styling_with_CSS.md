# Layout Component Styling with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-neighbours.html

Defines the visual properties for layout boxes and nested elements used in projection tests. Includes specific styles for state transitions and error highlighting for incorrect layouts.

```css
body { padding: 0; margin: 0; } .box { width: 100px; height: 100px; background-color: #00cc88; display: flex; justify-content: center; align-items: center; } .box.open { height: 200px; } .b { width: 50px; height: 50px; background-color: white; display: flex; justify-content: center; align-items: center; } .c { width: 25px; height: 25px; background-color: #00cc88; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------