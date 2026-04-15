# CSS Styles for Motion Containers

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-ancestor.html

Basic layout and visual styles for animation test boxes, including specific overrides for elements with incorrect layout data attributes.

```css
body { padding: 100px; margin: 0; }
#container { display: flex; flex-direction: column; }
.box { width: 100px; height: 100px; background-color: #0077ff; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 1 !important; }
```

--------------------------------