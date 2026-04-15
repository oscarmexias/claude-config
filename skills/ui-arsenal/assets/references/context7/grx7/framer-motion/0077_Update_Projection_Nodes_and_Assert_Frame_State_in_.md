# Update Projection Nodes and Assert Frame State in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-static-parent-child.skip.html

Initializes projection nodes for DOM elements, triggers a layout update via class manipulation, and uses assertion utilities to verify the number of nodes and recalculated projections.

```javascript
const { createNode, relativeEase } = window.Animate;
const { matchViewportBox, checkFrame } = window.Assert;
const { frame } = window.Projection;

const parent = document.getElementById("parent");
const parentProjection = createNode(
  parent,
  undefined,
  {},
  { duration: 0.0001 }
);

const child = document.getElementById("child");
const childProjection = createNode(
  child,
  parentProjection,
  {},
  { duration: 0.1 }
);

parentProjection.willUpdate();
childProjection.willUpdate();

parent.classList.add("b");

parentProjection.root.didUpdate();

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    console.log(window.ProjectionFrames);
    checkFrame(parent, 2, {
      totalNodes: 3,
      resolvedTargetDeltas: 1,
      recalculatedProjection: 1,
    });
  });
});
```

--------------------------------