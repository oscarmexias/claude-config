# CSS Layout and Styling for Flex Container

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/flexbox-siblings-layout-group.html

Defines the base styling for a flex container with two child elements and error state styling. The container uses flexbox layout with fixed dimensions and positioned offset. Child elements are styled with distinct background colors and equal flex distribution.

```css
body { padding: 0; margin: 0; overflow: hidden; }
#container { display: flex; position: relative; top: 100px; left: 100px; width: 300px; height: 200px; }
#a { background: #00cc88; }
#b { background: blue; }
#container > div { height: 200px; flex: 1; }
[data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------