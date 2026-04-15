# Initialize and Assert Projection Nodes in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/perf-parent-child.html

Creates projection nodes for DOM elements, triggers a layout update via class manipulation, and uses assertion frames to verify the internal state of the projection engine.

```javascript
const { createNode, relativeEase } = window.Animate;
const { matchViewportBox, checkFrame } = window.Assert;
const { frame } = window.Projection;

const parent = document.getElementById("parent");
const parentProjection = createNode(
  parent,
  undefined,
  {},
  { duration: 0.1 }
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
    checkFrame(parent, 1, {
      totalNodes: 3,
      resolvedTargetDeltas: 2,
      recalculatedProjection: 2,
    });
  });
});
```

--------------------------------