# Define Base and Animated States for Layout with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-undo-layout-change.html

This CSS snippet establishes the initial styling for a `parent` element and defines a `.b` class that represents an expanded state. It also includes styles for an off-screen trigger and a visual indicator for layout correctness. These styles are crucial for visually demonstrating layout transitions controlled by JavaScript.

```css
body { padding: 0; margin: 0; } #parent { width: 100px; height: 100px; background-color: #00cc88; } #parent.b { width: 110px; height: 110px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------