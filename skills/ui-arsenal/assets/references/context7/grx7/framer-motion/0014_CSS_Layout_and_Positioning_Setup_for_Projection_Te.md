# CSS Layout and Positioning Setup for Projection Test

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-within-element-scroll.html

Defines the CSS styling for a test layout with a scrollable container, fixed-positioned element, and child components. Includes overflow handling, flexbox alignment, and error state styling with data attributes. The layout creates a scenario where fixed positioning interacts with scroll containers.

```css
body { padding: 0; margin: 0; }
#container { width: 100px; height: 100px; overflow: scroll; }
#content { width: 400px; height: 100px; }
#fixed { position: fixed; top: 0; left: 0; width: 500px; height: 100px; background: #00cc88; display: flex; align-items: flex-start; }
#child { width: 100px; height: 100px; background: #0077ff; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------