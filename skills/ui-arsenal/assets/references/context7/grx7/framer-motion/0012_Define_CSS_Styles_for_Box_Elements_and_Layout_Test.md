# Define CSS Styles for Box Elements and Layout Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-layout-change.html

This CSS snippet defines basic styling for the document body and a '#box' element, including its default state and a modified state ('.b'). It also includes styles for a hidden overflow trigger and a data attribute for layout correction testing. These styles are used to set up visual elements for animation or layout testing scenarios.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #box.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------