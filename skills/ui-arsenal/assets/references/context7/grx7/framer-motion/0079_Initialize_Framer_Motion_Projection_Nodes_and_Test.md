# Initialize Framer Motion Projection Nodes and Test Viewport Matching

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/single-element-page-scroll-animated-overlay.html

This JavaScript snippet initializes Framer Motion's internal projection nodes for an overlay and a box element. It simulates a scroll offset and then uses assertion utilities (`matchViewportBox`) to verify the box's position relative to the viewport after layout updates, likely for testing layout correctness in a Framer Motion context. It depends on `window.Undo`, `window.Assert`, and `window.Projection` utilities.

```javascript
const { createNode } = window.Undo;
const { matchViewportBox, addPageScroll } = window.Assert;
const { frame } = window.Projection;
const overlay = document.getElementById("overlay");
const overlayProjection = createNode(overlay, undefined, { layoutScroll: true, layout: true, });
const box = document.getElementById("box");
const boxProjection = createNode(box, overlayProjection);
const boxOrigin = box.getBoundingClientRect();
overlayProjection.willUpdate();
boxProjection.willUpdate();
const scrollOffset = [50, 100];
window.scrollTo(...scrollOffset);
boxProjection.root.didUpdate();
matchViewportBox(box, { top: 0, left: 0, bottom: 100, right: 100 });
```

--------------------------------