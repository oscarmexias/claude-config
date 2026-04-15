# Styling for Parent and Child Elements with State-Dependent Layout in CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-interrupt.html

This CSS defines basic styles for `body`, `#parent`, and `#child` elements. It includes a state-dependent style for `#parent.b` which modifies its size, position, padding, and display properties, and also adjusts the `#child` element's size when its parent has the `b` class. An overflow trigger and a style for incorrect layout states are also defined.

```css
body { padding: 0; margin: 0; } #parent { width: 100px; height: 100px; background-color: #00cc88; } #child { width: 50px; height: 50px; background-color: #0077ff; } #parent.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; display: flex; justify-content: flex-end; } .b #child { width: 100px; height: 100px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------