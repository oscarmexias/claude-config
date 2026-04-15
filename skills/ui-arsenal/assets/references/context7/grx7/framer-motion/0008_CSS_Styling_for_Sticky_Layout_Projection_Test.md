# CSS Styling for Sticky Layout Projection Test

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-element-scroll-shared-child.html

Defines layout styles for a scrollable container with sticky header and child elements. Includes base element styling, overflow container dimensions, sticky positioning rules, and debug styling for layout validation failures.

```css
body { padding: 0; margin: 0; }
#position { width: 1px; height: 200px; }
#scroller { width: 200px; height: 200px; overflow: scroll; margin-left: 100px; }
#sticky { position: sticky; top: 0; left: 0; width: 100%; height: 50px; background: #0088ff; display: flex; justify-content: space-between; }
.child { width: 50px; height: 50px; background: #00cc88; }
#content { width: 100%; height: 400px; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------