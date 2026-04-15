# Initiating Framer Motion Optimized Appear Animations and Hydration

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/defer-handoff-layout.html

This JavaScript code demonstrates how to use Framer Motion's `startOptimizedAppearAnimation` function to apply performant entry animations to an element. It initiates both an opacity and a transform (translateX) animation. The transform animation's completion callback triggers `ReactDOM.hydrateRoot` to re-attach React to the server-rendered HTML after a delay, ensuring a smooth transition from static content to an interactive React application.

```javascript
// Start optimised opacity animation
startOptimizedAppearAnimation(
  document.getElementById("box"),
  "opacity",
  [0, 1],
  { duration: duration * 1000, ease: "linear", }
);

// Start WAAPI animation
const animation = startOptimizedAppearAnimation(
  document.getElementById("box"),
  "transform",
  ["translateX(0px)", "translateX(100px)"],
  { duration: duration * 1000, ease: "linear", },
  (animation) => {
    setTimeout(() => {
      ReactDOM.hydrateRoot(
        root,
        React.createElement(Component)
      );
    }, (duration * 1000) / 4);
  }
);
```

--------------------------------