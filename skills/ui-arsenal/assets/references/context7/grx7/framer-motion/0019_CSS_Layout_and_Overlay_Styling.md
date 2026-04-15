# CSS Layout and Overlay Styling

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll-overlay.html

Defines base styles for a 100x100px box with teal background, a fixed overlay covering the entire viewport, and a trigger element positioned at 2000px offsets to test overflow behavior. Includes a data attribute selector for highlighting incorrect layouts with red background and reduced opacity.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#overlay { position: fixed; inset: 0; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------