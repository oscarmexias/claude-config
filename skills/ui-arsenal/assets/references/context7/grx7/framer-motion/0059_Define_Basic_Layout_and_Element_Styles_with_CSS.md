# Define Basic Layout and Element Styles with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-relative-new-child.html

This CSS snippet defines the initial styling and positioning for several HTML elements, including `box-a`, `box-b`, `child`, and a `trigger-overflow` element. It sets absolute positioning, dimensions, background colors, and handles layout correction states. These styles are foundational for the subsequent JavaScript-driven layout and animation.

```css
body { padding: 0; margin: 0; } #box-a { position: absolute; top: 300px; left: 100px; width: 300px; height: 100px; background-color: #00cc88; } #box-b { position: absolute; top: 0px; left: 100px; width: 300px; height: 400px; background-color: #8855ff; } #child { position: absolute; top: 10px; right: 10px; width: 50px; height: 50px; background-color: #0077ff; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------