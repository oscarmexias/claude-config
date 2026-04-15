# Define CSS Styles for Parent and Child Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/transform-nested-parent-layout-change-scale-child-layout-change-transform.html

This CSS block defines the foundational styles for a parent and child element. It sets their dimensions, background colors, absolute positioning, and flexbox properties. A specific class '.b' is included to demonstrate a state change that alters the parent's alignment and position, and a rule for highlighting layout issues.

```css
body { padding: 0; margin: 0; }
#parent { width: 100px; height: 100px; background-color: #00cc88; position: absolute; top: 100px; left: 100px; display: flex; justify-content: flex-start; align-items: flex-start; }
#parent.b { justify-content: flex-end; align-items: flex-end; top: 200px; left: 200px; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------