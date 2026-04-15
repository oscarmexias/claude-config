# CSS Styling for Projection Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-parent-static-child-static-grandchild.skip.html

Defines base styles for parent, child, and grandchild elements with specific dimensions, colors, and positioning. Includes a modified state for the parent element with absolute positioning, flexbox layout, and a validation state indicator. The trigger-overflow element is positioned off-screen to test overflow handling.

```css
body { padding: 0; margin: 0; }
#parent { width: 100px; height: 100px; background-color: #00cc88; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#parent.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; display: flex; justify-content: flex-end; }
#grandChild { width: 100px; height: 100px; background-color: black; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------