# Define Basic CSS Styles for Layout Elements

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-scroll-no-layout-change-stick.html

This CSS code block sets fundamental styles for the `body` and specific HTML elements like `#box`, `#overlay`, and `#trigger-overflow`. It also includes a style rule to visually indicate layout correctness issues using `[data-layout-correct="false"]`.

```css
body { padding: 0; margin: 0; } #box { width: 100px; height: 100px; background-color: #00cc88; } #overlay { position: sticky; top: 0px; } #trigger-overflow { width: 1px; height: 1px; position: absolute; top: 2000px; left: 2000px; } [data-layout-correct="false"] { background: #dd1144 !important; opacity: 0.5; }
```

--------------------------------