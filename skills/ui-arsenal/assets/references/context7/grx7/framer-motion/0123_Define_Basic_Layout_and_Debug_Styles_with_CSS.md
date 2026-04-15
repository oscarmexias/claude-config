# Define Basic Layout and Debug Styles with CSS

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/flexbox-siblings.html

This CSS block sets up basic styling for a container and its child elements, including flexbox properties and background colors. It also includes a debug style for elements with 'data-layout-correct="false"', highlighting them in red. A hidden 'trigger-overflow' element is positioned far off-screen, possibly for testing scroll behavior or layout edge cases.

```css
body { padding: 0; margin: 0; } #container { display: flex; position: relative; top: 100px; left: 100px; width: 300px; height: 200px; } #a { background: #00cc88; } #b { background: blue; } #container > div { height: 200px; flex: 1; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } \[data-layout-correct="false"\] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------