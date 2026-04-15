# Define Base Styles and Layout Elements (CSS)

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-scroll-a-b-animate.html

This CSS snippet sets up basic page styling by removing default padding and margin. It defines a full-screen, fixed container (`.screen`), a scrollable utility class (`.scroll`), and styles for two distinct box elements (`#box`, `#box-b`). Additionally, it includes a debugging style to highlight elements with `data-layout-correct='false'`.

```css
body { padding: 0; margin: 0; } .screen { width: 100%; height: 100%; position: fixed; inset: 0; overflow: hidden; } .scroll { overflow-y: scroll; } #box { margin-top: 1000px; width: 100px; height: 100px; background-color: #0088ff; } #box-b { position: absolute; top: 100px; left: 100px; width: 200px; height: 200px; background-color: #0088ff; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------