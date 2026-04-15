# Base CSS Styling for Framer Motion Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-change-no-stick.html

This CSS defines the foundational styles for elements used in Framer Motion layout and projection tests. It includes styles for a sticky box, a size reference, an overflow trigger, and a visual indicator for layout correctness issues.

```css
body { padding: 0; margin: 0; }
#box { width: 100px; height: 100px; background-color: #00cc88; position: sticky; top: 0px; }
#size { height: 100px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------