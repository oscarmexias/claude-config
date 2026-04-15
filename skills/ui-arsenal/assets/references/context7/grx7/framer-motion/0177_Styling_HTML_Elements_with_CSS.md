# Styling HTML Elements with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-no-layout-change.html

This CSS snippet defines fundamental styles for various HTML elements, including the document body, a box, a position container, an overlay, and a trigger element. It also includes a rule to highlight elements with `data-layout-correct="false"` for debugging or visual feedback. These styles are crucial for setting up the visual layout and positioning of components.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; }
#position { height: 300px; }
#overlay { position: sticky; top: 0px; left: 0px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------