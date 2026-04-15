# JavaScript Layout Projection and Crossfade Implementation

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-interrupt.html

Demonstrates how to initialize projection nodes for DOM elements, assign shared layout IDs for crossfading, and use post-render hooks to assert viewport box positions.

```javascript
const { createNode } = window.Animate;
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius } = window.Assert;
const { frame } = window.Projection;

const box = document.getElementById("box-a");
const boxProjection = createNode(box, undefined, {
  layoutId: "a",
  crossfade: true,
});

boxProjection.willUpdate();

const newBox = document.createElement("div");
newBox.id = "box-b";
document.body.appendChild(newBox);

const newBoxProjection = createNode(newBox, undefined, {
  layoutId: "a",
  crossfade: true,
});

newBoxProjection.setValue("borderRadius", 20);
newBoxProjection.root.didUpdate();

let midBox = { bottom: 250, left: 50, right: 200, top: 50 };

frame.postRender(() => {
  matchViewportBox(box, midBox);
  matchViewportBox(newBox, midBox);
});
```

--------------------------------