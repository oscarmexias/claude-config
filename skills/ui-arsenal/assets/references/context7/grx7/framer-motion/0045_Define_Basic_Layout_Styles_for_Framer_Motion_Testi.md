# Define Basic Layout Styles for Framer Motion Testing (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-block-update-promote-new.html

This CSS snippet provides foundational styling for elements used in a Framer Motion layout projection test. It sets up initial dimensions, positions, and background colors for `#box-a` and `#box-b`, and includes a rule to highlight incorrect layout states. These styles are crucial for visually verifying the behavior of layout animations.

```css
body { padding: 0; margin: 0; } #box-a { width: 100px; height: 100px; background-color: #00cc88; } #box-b { position: absolute; top: 100px; left: 100px; width: 200px; height: 300px; background-color: #09f; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------