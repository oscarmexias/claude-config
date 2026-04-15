# Initialize and Update Projection Nodes in JavaScript

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/projection/animate-relative.html

JavaScript logic to create projection nodes for DOM elements and manage their update lifecycle. It captures the 'before' state using willUpdate(), modifies the DOM, and then triggers the projection calculation via didUpdate().

```javascript
const { createNode, relativeEase } = window.Animate;
const { matchViewportBox } = window.Assert;
const { frame } = window.Projection;

const parent = document.getElementById("parent");
const child = document.getElementById("child");

const parentProjection = createNode(
  parent,
  undefined,
  {},
  { ease: relativeEase() }
);

const childProjection = createNode(
  child,
  parentProjection,
  {},
  { delay: 1000, ease: relativeEase() }
);

parentProjection.willUpdate();
childProjection.willUpdate();

parent.classList.add("b");

parentProjection.root.didUpdate();
```

--------------------------------