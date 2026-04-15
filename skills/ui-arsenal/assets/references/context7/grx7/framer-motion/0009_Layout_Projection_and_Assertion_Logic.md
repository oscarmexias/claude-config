# Layout Projection and Assertion Logic

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/sticky-to-fixed.html

Initializes a projection node for a sticky element and triggers a layout update. It uses custom assertion utilities to verify that the element's viewport box remains consistent after a class change.

```javascript
const { createNode } = window.Undo;
const { matchViewportBox, matchVisibility, matchOpacity, addPageScroll } = window.Assert;
const { frame } = window.Projection;
const sticky = document.querySelector(".sticky");
const stickyProjection = createNode(sticky, undefined);
const stickyOrigin = sticky.getBoundingClientRect();

stickyProjection.willUpdate();
sticky.classList.add("b");
stickyProjection.root.didUpdate();

setTimeout(() => {
  matchViewportBox(sticky, stickyOrigin);
}, 50);
```

--------------------------------