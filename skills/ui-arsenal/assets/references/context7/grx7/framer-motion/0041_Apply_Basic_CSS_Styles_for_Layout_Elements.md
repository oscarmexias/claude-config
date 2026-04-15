# Apply Basic CSS Styles for Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/fixed-child-page-scroll.html

This CSS block defines fundamental styles for the page body and several key elements used in layout testing. It sets up a fixed-position container, a child element, and an overflow trigger, along with a visual indicator for incorrect layout states.

```css
body { padding: 0; margin: 0; }
#container { width: 100px; height: 100px; }
#fixed { position: fixed; top: 0; left: 0; width: 500px; height: 100px; background: #00cc88; display: flex; align-items: flex-start; }
#child { width: 100px; height: 100px; background: #0077ff; }
#trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------