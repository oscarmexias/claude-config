# CSS Styles for Projection Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-parent-delayed.html

Defines the visual properties for parent and child elements, including their initial states and modified layout configurations. It also includes a utility for highlighting layout errors using data attributes.

```css
body { padding: 0; margin: 0; }
#parent { width: 100px; height: 100px; background-color: #00cc88; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
#parent.b { width: 200px; position: absolute; top: 100px; left: 200px; padding: 20px; display: flex; justify-content: flex-end; }
.b #child { width: 100px; height: 100px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------