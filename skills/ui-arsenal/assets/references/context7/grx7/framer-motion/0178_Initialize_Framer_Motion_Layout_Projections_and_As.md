# Initialize Framer Motion Layout Projections and Assert Properties in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/shared-nested-promote-new-mix-interrupt.html

This JavaScript code demonstrates the creation and manipulation of layout projection nodes using Framer Motion's internal `Animate` and `Projection` APIs. It sets up initial and new parent-child projection relationships, applies a `borderRadius` value, and uses `Assert` utilities to verify viewport box, visibility, and opacity properties after rendering. This snippet is crucial for testing complex layout animations and transitions.

```javascript
const { createNode } = window.Animate;
const { matchViewportBox, matchVisibility, matchOpacity, matchBorderRadius, } = window.Assert;
const { frame } = window.Projection;
const box = document.getElementById("box-a");
const boxProjection = createNode(box, undefined, { layoutId: "a", crossfade: true, });
const child = document.getElementById("child-a");
const childProjection = createNode(child, boxProjection, { layoutId: "b", crossfade: true, });
boxProjection.willUpdate();
childProjection.willUpdate();
const newBox = document.createElement("div");
newBox.id = "box-b";
document.body.appendChild(newBox);
const newBoxProjection = createNode(newBox, undefined, { layoutId: "a", crossfade: true, });
const newChild = document.createElement("div");
newChild.id = "child-b";
newBox.appendChild(newChild);
const newChildProjection = createNode(newChild, newBoxProjection, { layoutId: "b", crossfade: true, });
newBoxProjection.setValue("borderRadius", 20);
newBoxProjection.root.didUpdate();
let midBox = { bottom: 100, left: 50, right: 125, top: 50 };
frame.postRender(() => {
  matchViewportBox(child, midBox);
  matchViewportBox(newChild, midBox);
  matchVisibility(child, "visible");
  matchVisibility(newChild, "visible");
  matchOpacity(box, 1);
  matchOpacity(newBox, 1);
  matchOpacity(child, 1);
  matchOpacity(newChild, 1);
  boxProjection.willUpdate();
  childProjection.willUpdate();
  newBoxProjection.willUpdate();
  newChildProjection.willUpdate();
  boxProjection.promote();
  childProjection.promote();
  newBoxProjection.root.didUpdate();
  midBox = { bottom: 75, left: 25, right: 87.5, top: 25 };
  frame.postRender(() => {
    matchViewportBox(child, midBox);
    matchViewportBox(newChild, midBox);
    matchVisibility(child, "visible");
    matchVisibility(newChild, "visible");
    matchOpacity(box, 1);
    matchOpacity(newBox, 1);
    matchOpacity(child, 1);
    matchOpacity(newChild, 1);
  });
});
```

--------------------------------