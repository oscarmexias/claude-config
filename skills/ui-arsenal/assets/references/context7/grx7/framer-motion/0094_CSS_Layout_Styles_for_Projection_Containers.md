# CSS Layout Styles for Projection Containers

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-transform-parents.html

Defines the structural and visual styles for the projection test environment. It includes absolute positioning for containers and specific styling for child elements and layout correction indicators.

```css
body { padding: 0; margin: 0; }
#box-a { width: 200px; height: 200px; position: absolute; left: 100px; top: 100px; background-color: #00cc88; }
#box-b { position: absolute; top: 100px; left: 600px; width: 200px; height: 200px; background-color: #09f; }
.child { position: relative; top: 20px; left: 20px; width: 100px; height: 100px; background-color: #ffcc00; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------