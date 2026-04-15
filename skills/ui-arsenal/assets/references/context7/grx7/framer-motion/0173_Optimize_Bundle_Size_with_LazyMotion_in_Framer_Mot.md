# Optimize Bundle Size with LazyMotion in Framer Motion

Source: https://context7.com/grx7/framer-motion/llms.txt

Utilize the LazyMotion component to load animation features on demand, significantly reducing initial bundle size. It works in conjunction with the 'm' component and supports both synchronous and asynchronous loading of feature sets like domAnimation or domMax.

```jsx
import { LazyMotion, domAnimation, domMax, m } from "framer-motion"

// Synchronous: ~17KB for animations only
function SyncExample() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }} />
    </LazyMotion>
  )
}

// Full features: ~29KB with gestures, drag, layout
function FullFeaturesExample() {
  return (
    <LazyMotion features={domMax}>
      <m.div drag whileHover={{ scale: 1.1 }} layout />
    </LazyMotion>
  )
}

// Async loading for maximum code splitting
function AsyncExample() {
  return (
    <LazyMotion
      features={() => import("./motion-features").then(mod => mod.default)}
      strict // Throws if m components render before features load
    >
      <m.div animate={{ x: 100 }}>
        Features load asynchronously
      </m.div>
    </LazyMotion>
  )
}

// motion-features.js
export { domMax as default } from "framer-motion"
```

--------------------------------