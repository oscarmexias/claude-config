# CSS Styling for Sticky Layout Test

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-element-scroll.html

Defines layout structure for testing sticky positioning with a scrollable container, sticky header element, and overflow trigger. Includes visual debugging styles to highlight layout correctness issues with red background and reduced opacity.

```css
body { padding: 0; margin: 0; }
#position { width: 1px; height: 200px; }
#scroller { width: 200px; height: 200px; overflow: scroll; margin-left: 100px; }
#sticky { position: sticky; top: 0; left: 0; width: 100%; height: 50px; background: #0088ff; display: flex; align-items: flex-start; }
#child { width: 50px; height: 50px; background: #00cc88; }
#content { width: 100%; height: 400px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------