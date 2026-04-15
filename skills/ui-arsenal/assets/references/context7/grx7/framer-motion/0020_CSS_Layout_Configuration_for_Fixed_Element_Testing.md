# CSS Layout Configuration for Fixed Element Testing

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-page-scroll-layout-change.html

Defines the visual structure for the test case, including a fixed-position header and an overflow trigger to enable page scrolling. It also includes a debug style for identifying incorrect layouts via data attributes.

```css
body { padding: 0; margin: 0; }
#container { width: 100px; height: 100px; }
#fixed { position: fixed; top: 0; left: 0; width: 500px; height: 50px; background: #00cc88; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------