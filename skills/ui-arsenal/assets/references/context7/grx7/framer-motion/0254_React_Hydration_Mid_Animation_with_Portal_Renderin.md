# React Hydration Mid-Animation with Portal Rendering

Source: https://github.com/grx7/framer-motion/blob/main/dev/html/public/optimized-appear/portal.html

Implements a hydration strategy that occurs halfway through the Motion One animation. A secondary motion.div is rendered to a portal element, while the root component is hydrated with ReactDOMServer. This pattern tests the framework's ability to handle concurrent animations and hydration events without disrupting the primary animation.

```javascript
setTimeout(() => {
  ReactDOM.createRoot(
    document.getElementById("portal")
  ).render(
    React.createElement(motion.div, {
      id: "box-2",
      initial: { y: 0 },
      animate: { y: 100, scale: 2 },
      transition: { duration, ease: "linear" },
      style: { width: 100, height: 100, background: "red" }
    })
  )
  ReactDOM.hydrateRoot(root, Component)
}, (duration * 1000) / 2)
```

--------------------------------