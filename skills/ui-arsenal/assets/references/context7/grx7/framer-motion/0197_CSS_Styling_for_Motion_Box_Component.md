# CSS Styling for Motion Box Component

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout-uselayouteffect.html

Defines base styles for the animated box element and error state indicator. The box has fixed dimensions and blue background, while the error state applies red background with full opacity override.

```css
body { padding: 100px; margin: 0; }
#box { width: 100px; height: 100px; background-color: #0077ff; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 1 !important; }
```

--------------------------------