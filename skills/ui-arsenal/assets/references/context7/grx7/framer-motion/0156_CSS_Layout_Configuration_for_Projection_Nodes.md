# CSS Layout Configuration for Projection Nodes

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-interrupt.html

Defines the structural styles for elements participating in layout transitions, including specific positioning for crossfading nodes and a debug state for layout errors.

```css
body { padding: 0; margin: 0; }
#box-a {
  width: 100px;
  height: 100px;
  background-color: #00cc88;
}
#box-b {
  position: absolute;
  top: 100px;
  left: 100px;
  width: 200px;
  height: 300px;
  background-color: #09f;
}
#trigger-overflow {
  width: 1px;
  height: 1px;
  position: absolute;
  top: 2000px;
  left: 2000px;
}
[data-layout-correct="false"] {
  background: #dd1144 !important;
  opacity: 0.5;
}
```

--------------------------------