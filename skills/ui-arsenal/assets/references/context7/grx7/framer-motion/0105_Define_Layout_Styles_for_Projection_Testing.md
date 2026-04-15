# Define Layout Styles for Projection Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-rotate-layout.html

CSS rules to define the visual structure and dimensions of parent and child elements used in layout projection tests. It includes specific dimensions for different test cases and a helper for identifying layout errors via data attributes.

```css
body { padding: 0; margin: 0; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; }
.parent { background: #363636; display: flex; justify-content: flex-end; align-items: flex-end; }
.child { background: #ff0055; }
#parent-a { width: 100px; height: 100px; }
#child-a { width: 50px; height: 50px; }
#parent-b { width: 400px; height: 200px; }
#child-b { width: 100px; height: 100px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #09f !important; opacity: 0.5; }
```

--------------------------------