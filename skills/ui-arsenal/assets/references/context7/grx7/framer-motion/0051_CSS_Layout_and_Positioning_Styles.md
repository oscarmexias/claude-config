# CSS Layout and Positioning Styles

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-from-static.html

Defines the visual layout for the test environment including container dimensions, fixed positioning styles, and error state styling. The styles establish a 100x100px container with a 500x100px fixed element and a child element, plus a trigger element positioned off-screen to test overflow behavior.

```css
body { padding: 0; margin: 0; }
#container { width: 100px; height: 100px; }
#fixed { position: static; top: 0; left: 0; width: 500px; height: 100px; background: #00cc88; display: flex; align-items: flex-start; }
#child { width: 100px; height: 100px; background: #0077ff; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------