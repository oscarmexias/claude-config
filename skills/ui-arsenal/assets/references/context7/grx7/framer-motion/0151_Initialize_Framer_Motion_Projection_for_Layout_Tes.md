# Initialize Framer Motion Projection for Layout Test in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-rotate.html

This JavaScript code initializes a test scenario using Framer Motion's internal `Projection` and `Undo` utilities. It creates two projection nodes (`boxProjection`, `newBoxProjection`) for elements `box-a` and `box-b`, applies a layout ID, and then performs assertions on their viewport box, visibility, and opacity after a short delay, simulating a layout transition test.

```javascript
const { createNode } = window.Undo;
const { matchViewportBox, matchVisibility, matchOpacity } = window.Assert;
const { frame } = window.Projection;
const box = document.getElementById("box-a");
const boxProjection = createNode(box, undefined, { layoutId: "a" });
const boxOrigin = box.getBoundingClientRect();
boxProjection.willUpdate();
const newBox = document.createElement("div");
newBox.id = "box-b";
document.body.appendChild(newBox);
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", crossfade: false });
newBoxProjection.setValue("rotate", 45);
newBoxProjection.root.didUpdate();
setTimeout(() => {
  matchViewportBox(box, boxOrigin);
  matchViewportBox(newBox, boxOrigin);
  matchVisibility(box, "hidden");
  matchVisibility(newBox, "visible");
  matchOpacity(newBox, 1);
}, 50);
```

--------------------------------