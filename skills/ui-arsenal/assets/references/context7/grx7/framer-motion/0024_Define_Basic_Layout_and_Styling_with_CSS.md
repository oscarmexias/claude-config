# Define Basic Layout and Styling with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-transform-parents-animate.html

This CSS snippet defines the basic styling and positioning for several HTML elements, including `body`, `#box-a`, `#box-b`, and `.child`. It sets dimensions, background colors, and absolute/relative positioning to establish a foundational layout. Additionally, it includes a rule for an overflow trigger and a style for elements with `data-layout-correct="false"`.

```css
body { padding: 0; margin: 0; } #box-a { width: 200px; height: 200px; position: absolute; left: 100px; top: 100px; background-color: #00cc88; } #box-b { position: absolute; top: 100px; left: 600px; width: 200px; height: 200px; background-color: #09f; } .child { position: relative; top: 20px; left: 20px; width: 100px; height: 100px; background-color: #ffcc00; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------