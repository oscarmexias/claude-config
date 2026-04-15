# CSS Sticky and Fixed Positioning Styles

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-to-fixed-page-scroll.skip.html

Defines CSS styles for sticky and fixed positioned elements with layout correction states. Includes base body reset, sticky container with top offset, fixed variant positioning, overflow trigger element, and visual feedback for layout correction failures using data attributes.

```css
body { padding: 0; margin: 0; }
#position { width: 1px; height: 200px; }
.sticky { position: sticky; top: 100px; width: 100%; height: 200px; background: #0088ff; }
.sticky.b { position: fixed; top: 0; left: 0; width: 300px; height: 300px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------