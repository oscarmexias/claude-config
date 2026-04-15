# CSS Layout Configuration for Projection Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative-instant.html

Defines the visual structure and positioning for parent, intermediate, and child elements. It includes a modifier class to trigger layout shifts used in projection testing and visual debugging states.

```css
body { padding: 0; margin: 0; }
#parent { position: relative; width: 200px; height: 200px; background-color: #00cc88; }
#mid { position: absolute; width: auto; height: auto; left: 0; top: 0; }
.b #mid { left: 100px; }
#child { width: 50px; height: 50px; background-color: #0077ff; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------