# CSS Layout Configuration for Projection Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-skip-parent.html

Defines the visual structure and positioning for the test elements, including parent, middle, and child boxes. It uses absolute positioning and flexbox to create a nested hierarchy for layout testing.

```css
body { padding: 0; margin: 0; }
#parent { position: relative; width: 200px; height: 200px; padding: 50px; background-color: #00cc88; }
#mid { width: 100px; height: 100px; background-color: white; display: flex; align-items: flex-start; justify-content: flex-start; position: absolute; top: 50px; left: 50px; }
#parent.b { width: 500px; height: 500px; }
.b #mid { justify-content: flex-end; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------