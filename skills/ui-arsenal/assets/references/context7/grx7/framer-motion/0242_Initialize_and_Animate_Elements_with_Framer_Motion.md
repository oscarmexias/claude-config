# Initialize and Animate Elements with Framer Motion-like API in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-promote-new-mix-rotate.html

This JavaScript code initializes two DOM elements (`#box-a` and a newly created `#box-b`) using a Framer Motion-like `createNode` API, assigning them the same `layoutId`. It then applies various animated properties such as opacity, border-radius, and rotation to these elements. Finally, it uses `frame.postRender` to assert the visual state of the elements, checking their viewport box, visibility, opacity, rotation, and border-radius after rendering.

```javascript
const { createNode } = window.Animate;
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, matchRotate, } = window.Assert;
const { frame } = window.Projection;
const box = document.getElementById("box-a");
const boxProjection = createNode(box, undefined, { layoutId: "a" });
boxProjection.willUpdate();
const newBox = document.createElement("div");
newBox.id = "box-b";
document.body.appendChild(newBox);
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", });
boxProjection.setValue("opacity", 0.8);
newBoxProjection.setValue("borderRadius", 20);
newBoxProjection.setValue("rotate", 40);
newBoxProjection.root.didUpdate();
frame.postRender(() => {
  const bbox = newBox.getBoundingClientRect();
  matchViewportBox(box, bbox);
  matchVisibility(box, "visible");
  matchVisibility(newBox, "visible");
  matchOpacity(box, 0.8);
  matchOpacity(newBox, 1);
  matchRotate(box, 20);
  matchRotate(newBox, 20);
  matchBorderRadius(box, "6.66667% / 5%");
  matchBorderRadius(newBox, "6.66667% / 5%");
});
```

--------------------------------